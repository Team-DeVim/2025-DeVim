package com.Devim.backend.service.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRole;
import com.Devim.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	@Value("${upload.path}")
	private String uploadPath;
	
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long create(User user) {
        userRepository.save(user);

        // User의 기본 권한 생성
        UserRole userRole = new UserRole(user.getUserNo(), "MEMBER");

        userRepository.addRole(userRole);

        return user.getUserNo();
    }

    @Override
    public User get(Long userNo) {
        return userRepository.findById(userNo)
                .orElseThrow(()-> new NoSuchElementException("User not found :" + userNo));
    }

    @Override
    public PageResponseDto<User> list(PageRequestDto pageRequestDto) {
        return userRepository.findAll(pageRequestDto);
    }

    @Override
    @Transactional
    public void update(User user) {
        userRepository.update(user);
    }

    @Override
    public void delete(Long userNo) {
        userRepository.deleteById(userNo);
    }

    @Override
    public void hardDelete(Long userNo) {
        userRepository.hardDeleteById(userNo);
    }

    @Override
    @Transactional
    public String uploadProfileImage(long userNo, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        // upload 할 경로를 생성 (Paths.get() : OS에 따라 올바른 파일 구분자를 자동으로 처리)
        Path profileUploadPath = Paths.get(uploadPath, "profile");
        if (!Files.exists(profileUploadPath)) {
            Files.createDirectories(profileUploadPath);
        }

        // 고유한 filename 생성
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path filePath = profileUploadPath.resolve(uniqueFilename);

        // 파일 저장
        Files.copy(file.getInputStream(), filePath);

        // User의 profile image path를 업데이트
        User userToUpdate = new User();
        userToUpdate.setUserNo(userNo);
        userToUpdate.setProfileImagePath(filePath.toString());
        userRepository.update(userToUpdate);

        return filePath.toString();
    }

    @Override
    public byte[] getThumbnail(long userNo, int width, int height) throws IOException {
        // 사용자 정보 조회
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + userNo));

        // 사용자의 프로필 이미지 경로 확인
        String profileImagePath = user.getProfileImagePath();
        if (profileImagePath == null || profileImagePath.isEmpty()) {
            // 프로필 이미지가 없는 경우, 기본 이미지를 반환하거나 예외를 발생시킬 수 있습니다.
            throw new NoSuchElementException("Profile image not found for user: " + userNo);
        }

        // 실제 파일 존재 여부 확인
        File imageFile = new File(profileImagePath);
        if (!imageFile.exists()) {
            throw new IOException("Profile image file not found: " + profileImagePath);
        }

        // Thumbnailator를 사용하여 썸네일 생성
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(imageFile)                // 원본 이미지 파일
                .size(width, height)                 // 150x150 크기로 리사이즈
                .outputFormat("jpg")              // 출력 형식을 JPG로 지정
                .toOutputStream(outputStream);      // OutputStream으로 출력

        // 생성된 썸네일의 byte 배열 반환
        return outputStream.toByteArray();
    }
}
