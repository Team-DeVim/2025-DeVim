package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.likes.Likes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface LikesMapper {

    Optional<Likes> findByUserAndTarget(@Param("userNo") long userNo, @Param("targetId") long targetId, @Param("targetType") String targetType);

    void save(Likes like);

    void delete(Likes like);
}
