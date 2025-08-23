package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.likes.Likes;
import com.Devim.backend.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MyBatisLikesRepository implements LikesRepository {

    private final LikesMapper likesMapper;

    @Override
    public Optional<Likes> findByUserAndTarget(long userNo, long targetId, String targetType) {
        return likesMapper.findByUserAndTarget(userNo, targetId, targetType);
    }

    @Override
    public void save(Likes like) {
        likesMapper.save(like);
    }

    @Override
    public void delete(Likes like) {
        likesMapper.delete(like);
    }
}
