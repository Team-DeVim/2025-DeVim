package com.Devim.backend.service.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.repository.MainImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        String storedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
        Path destination = Paths.get(uploadPath, storedFileName);

        if (!Files.exists(destination.getParent())) {
            Files.createDirectories(destination.getParent());
        }

        Files.copy(file.getInputStream(), destination);

        MainImage mainImage = new MainImage();
        mainImage.setFilePath("/upload/" + storedFileName);
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

        Path filePath = Paths.get(uploadPath, mainImage.getFilePath().replace("/upload/", ""));
        Files.deleteIfExists(filePath);

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
