package com.Devim.backend.service.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MainImageService {
    List<MainImage> findAll();
    void saveImage(MultipartFile file, int priority) throws IOException;
    void deleteImage(long imageNo) throws IOException;
    void swapPriority(long imageId1, long imageId2);
}