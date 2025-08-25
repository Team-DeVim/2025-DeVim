package com.Devim.backend.service.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.domain.mainimage.MainImageResetRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MainImageService {
    List<MainImage> findAll();
    
    void resetImages(List<MainImageResetRequestDto> dtoList);

    String uploadImage(MultipartFile file) throws IOException;
}