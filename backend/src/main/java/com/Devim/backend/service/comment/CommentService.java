package com.Devim.backend.service.comment;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.Optional;

public interface CommentService {
    Long create(Comment comment);

    CommentDto get(Long commentNo);

    PageResponseDto<CommentDto> listByBoard(Long boardNo, PageRequestDto pageRequestDto);

    void update(Comment comment);

    void delete(Long commentNo);
}
