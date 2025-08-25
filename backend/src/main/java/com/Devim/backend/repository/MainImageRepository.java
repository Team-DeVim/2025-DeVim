package com.Devim.backend.repository;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.domain.mainimage.MainImageResetRequestDto;

import java.util.List;

public interface MainImageRepository {
    // void save(MainImage mainImage);
    List<MainImage> findAll();
    // void updatePriority(long imageNo, int priority);
    // void deleteById(long imageNo);

    void resetImages(List<MainImageResetRequestDto> dtoList);
}