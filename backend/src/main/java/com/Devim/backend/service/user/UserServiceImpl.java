package com.Devim.backend.service.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;
import com.Devim.backend.domain.user.UserSummaryResponseDto;
import com.Devim.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
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
        return user.getUserNo();
    }

    @Override
    public User get(Long userNo) {
        return userRepository.findById(userNo)
                .orElseThrow(()-> new NoSuchElementException("User not found :" + userNo));
    }

    @Override
    public User getByUserId(String id) {
        return userRepository.findByUserId(id)
                .orElseThrow(() -> new NoSuchElementException("User not found :" + id));
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
    public void reactivate(Long userNo) {
        userRepository.reactivateById(userNo);
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
        userToUpdate.setProfileImagePath("/upload/profile/" + uniqueFilename);
        userRepository.update(userToUpdate);

        return "/upload/profile/" + uniqueFilename;
    }

    @Override
    public byte[] getThumbnail(long userNo, int width, int height) throws IOException {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + userNo));

        String profileImagePath = user.getProfileImagePath();
        File imageFile;

        if (profileImagePath == null || profileImagePath.isEmpty()) {
            // 프로필 이미지가 없는 경우, 기본 이미지 사용
            ClassPathResource defaultImageResource = new ClassPathResource("static/images/default_profile.png");
            if (!defaultImageResource.exists()) {
                throw new IOException("Default profile image not found.");
            }
            imageFile = defaultImageResource.getFile();
        } else {
            // 프로필 이미지가 있는 경우, URL 경로를 실제 파일 시스템 경로로 변환
            String relativePath = profileImagePath.replace("/upload/", "");
            Path fullPath = Paths.get(uploadPath, relativePath);
            imageFile = fullPath.toFile();
            
            if (!imageFile.exists()) {
                // 변환된 경로에도 파일이 없는 경우 예외 처리
                throw new IOException("Profile image file not found at: " + fullPath.toString());
            }
        }

        // Thumbnailator를 사용하여 썸네일 생성
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(imageFile)
                .size(width, height)
                .outputFormat("jpg") // 출력 형식을 JPG로 통일
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    @Override
    public UserSummaryResponseDto getUserSummary(long userNo) {
        User user = userRepository.findById(userNo)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + userNo));

        long postCount = userRepository.countBoardsByUser(userNo);
        long commentCount = userRepository.countCommentsByUser(userNo);

        UserSummaryResponseDto summary = new UserSummaryResponseDto();
        summary.setUserNo(user.getUserNo());
        summary.setId(user.getId());
        summary.setName(user.getName());
        summary.setProfileImagePath(user.getProfileImagePath());
        summary.setPostCount(postCount);
        summary.setCommentCount(commentCount);

        return summary;
    }

    @Override
    public List<UserRankDto> findTop5ByBoardCount() {
        return userRepository.findTop5ByBoardCount();
    }

    @Override
    public List<UserRankDto> findTop5ByCommentCount() {
        return userRepository.findTop5ByCommentCount();
    }
}
