package com.Devim.backend.repository;

import com.Devim.backend.domain.likes.Likes;

import java.util.Optional;

public interface LikesRepository {
    Optional<Likes> findByUserAndTarget(long userNo, long targetId, String targetType);
    void save(Likes like);
    void delete(Likes like);
}
