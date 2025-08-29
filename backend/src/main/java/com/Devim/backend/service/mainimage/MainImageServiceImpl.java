package com.Devim.backend.service.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.domain.mainimage.MainImageResetRequestDto;
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
    public void resetImages(List<MainImageResetRequestDto> dtoList) {
        mainImageRepository.resetImages(dtoList);
    }

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot save empty file.");
        }

        String originalFileName = file.getOriginalFilename();
        // Remove extension from original name
        String baseName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        
        String uuid = UUID.randomUUID().toString();
        String storedFileName = uuid + "_" + baseName + extension;
        String storedThumbnailName = uuid + "_" + baseName + "_thumb" + extension;

        Path mainImageUploadPath = Paths.get(uploadPath, "mainImage");
        if (!Files.exists(mainImageUploadPath)) {
            Files.createDirectories(mainImageUploadPath);
        }

        Path originalDestination = mainImageUploadPath.resolve(storedFileName);
        Path thumbnailDestination = mainImageUploadPath.resolve(storedThumbnailName);

        Files.copy(file.getInputStream(), originalDestination);

        Thumbnails.of(originalDestination.toFile())
                .size(200, 150)
                .toFile(thumbnailDestination.toFile());

        // Return the accessible URL path for the client
        return "/upload/mainImage/" + storedFileName;
    }
}