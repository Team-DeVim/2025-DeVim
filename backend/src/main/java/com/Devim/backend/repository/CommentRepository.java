package com.Devim.backend.repository;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    void save(Comment comment);
    Optional<CommentDto> findById(long commentNo);
    PageResponseDto<CommentDto> findByBoardId(long boardNo, PageRequestDto pageRequest);
    void update(Comment comment);
    void deleteById(long commentNo);
