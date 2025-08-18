package com.Devim.backend.repository;

import com.Devim.backend.domain.mainimage.MainImage;
import java.util.List;

public interface MainImageRepository {
    void save(MainImage mainImage);
    List<MainImage> findAll();
    void updatePriority(long imageNo, int priority);
    void deleteById(long imageNo);
}
