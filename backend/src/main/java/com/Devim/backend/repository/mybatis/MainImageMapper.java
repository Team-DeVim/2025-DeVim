package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.domain.mainimage.MainImageResetRequestDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainImageMapper {
    // void save(MainImage mainImage);
    List<MainImage> findAll();
    // void updatePriority(@Param("imageNo") long imageNo, @Param("priority") int priority);
    // void deleteById(@Param("imageNo") long imageNo);

    void deleteAll();

    void saveAll(List<MainImageResetRequestDto> dtoList);
}