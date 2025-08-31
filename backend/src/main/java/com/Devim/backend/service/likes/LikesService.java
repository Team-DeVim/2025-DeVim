package com.Devim.backend.service.likes;

public interface LikesService {
    void toggleLike(long userNo, long targetId, String targetType);

    boolean checkLikeStatus(long userNo, long targetId, String targetType);
}
