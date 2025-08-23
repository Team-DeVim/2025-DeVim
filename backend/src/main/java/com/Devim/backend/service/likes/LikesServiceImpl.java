package com.Devim.backend.service.likes;

import com.Devim.backend.domain.likes.Likes;
import com.Devim.backend.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikesServiceImpl implements LikesService {

    private final LikesRepository likesRepository;

    @Override
    public void toggleLike(long userNo, long targetId, String targetType) {
        Optional<Likes> existingLike = likesRepository.findByUserAndTarget(userNo, targetId, targetType);

        if (existingLike.isPresent()) {
            // Already liked, so unlike
            likesRepository.delete(existingLike.get());
        } else {
            // Not liked, so like
            Likes newLike = new Likes();
            newLike.setUserNo(userNo);
            newLike.setTargetId(targetId);
            newLike.setTargetType(targetType);
            likesRepository.save(newLike);
        }
    }
}
