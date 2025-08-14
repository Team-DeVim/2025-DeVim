package com.Devim.backend.repository;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    void save(Comment comment);
    Optional<CommentDto> findById(long commentNo);
    List<CommentDto> findByBoardId(long boardNo);
    void update(Comment comment);
    void deleteById(long commentNo);
}
