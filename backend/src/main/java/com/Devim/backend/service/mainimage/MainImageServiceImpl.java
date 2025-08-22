package com.Devim.backend.service.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.repository.MainImageRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MainImageServiceImpl implements MainImageService {

    private final MainImageRepository mainImageRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    @Transactional(readOnly = true)
    public List<MainImage> findAll() {
        return mainImageRepository.findAll();
    }

    @Override
    @Transactional
    public void saveImage(MultipartFile file, int priority) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot save empty file.");
        }

        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String storedFileName = UUID.randomUUID().toString() + fileExtension;
        String storedThumbnailName = UUID.randomUUID().toString() + "_thumb" + fileExtension;

        // upload 할 경로를 생성 (Paths.get() : OS에 따라 올바른 파일 구분자를 자동으로 처리)
        Path mainImageUploadPath = Paths.get(uploadPath, "mainImage");
        if (!Files.exists(mainImageUploadPath)) {
            Files.createDirectories(mainImageUploadPath);
        }

        Path originalDestination = mainImageUploadPath.resolve(storedFileName);
        Path thumbnailDestination = mainImageUploadPath.resolve(storedThumbnailName);

        // 원본 파일 저장
        Files.copy(file.getInputStream(), originalDestination);

        // Thumbnailator를 사용하여 썸네일 가공 및 저장
        Thumbnails.of(originalDestination.toFile())
                .size(200, 150)
                .toFile(thumbnailDestination.toFile());

        MainImage mainImage = new MainImage();
        mainImage.setFilePath("/upload/mainImage/" + storedFileName);
        mainImage.setThumbnailPath("/upload/mainImage/" + storedThumbnailName);
        mainImage.setPriority(priority);

        mainImageRepository.save(mainImage);
    }

    @Override
    @Transactional
    public void deleteImage(long imageNo) throws IOException {
        MainImage mainImage = mainImageRepository.findAll().stream()
                .filter(m -> m.getImageNo() == imageNo)
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Image not found: " + imageNo));

        // Delete original file from server
        Path originalFilePath = Paths.get(uploadPath, mainImage.getFilePath().replace("/upload/", ""));
        Files.deleteIfExists(originalFilePath);

        // Delete thumbnail file from server
        Path thumbnailFilePath = Paths.get(uploadPath, mainImage.getThumbnailPath().replace("/upload/", ""));
        Files.deleteIfExists(thumbnailFilePath);

        // Delete from database
        mainImageRepository.deleteById(imageNo);
    }

    @Override
    @Transactional
    public void swapPriority(long imageId1, long imageId2) {
        List<MainImage> images = mainImageRepository.findAll();
        MainImage image1 = images.stream().filter(m -> m.getImageNo() == imageId1).findFirst().orElseThrow(() -> new NoSuchElementException("Image not found: " + imageId1));
        MainImage image2 = images.stream().filter(m -> m.getImageNo() == imageId2).findFirst().orElseThrow(() -> new NoSuchElementException("Image not found: " + imageId2));

        int tempPriority = image1.getPriority();

        mainImageRepository.updatePriority(image1.getImageNo(), image2.getPriority());
        mainImageRepository.updatePriority(image2.getImageNo(), tempPriority);
    }
}