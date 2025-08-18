package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.repository.MainImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MyBatisMainImageRepository implements MainImageRepository {

    private final MainImageMapper mainImageMapper;

    @Override
    public void save(MainImage mainImage) {
        mainImageMapper.save(mainImage);
    }

    @Override
    public List<MainImage> findAll() {
        return mainImageMapper.findAll();
    }

    @Override
    public void updatePriority(long imageNo, int priority) {
        mainImageMapper.updatePriority(imageNo, priority);
    }

    @Override
    public void deleteById(long imageNo) {
        mainImageMapper.deleteById(imageNo);
    }
}
