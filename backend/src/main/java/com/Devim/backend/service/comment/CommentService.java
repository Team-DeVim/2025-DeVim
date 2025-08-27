package com.Devim.backend.service.comment;

import com.Devim.backend.domain.comment.CommentCreateRequestDto;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.comment.CommentUpdateRequestDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;

public interface CommentService {
    Long create(CommentCreateRequestDto requestDto, Long userNo);

    CommentListResponseDto get(Long commentNo);

    PageResponseDto<CommentListResponseDto> listByBoard(Long boardNo, PageRequestDto pageRequestDto);

    void update(Long commentNo, CommentUpdateRequestDto requestDto);

    void delete(Long commentNo);

    List<MonthlyCountDto> countMonthlyComments();

    PageResponseDto<CommentListResponseDto> getCommentsByUser(long userNo, PageRequestDto pageRequestDto);

    PageResponseDto<CommentListResponseDto> getCommentsByUserDesc(long userNo, PageRequestDto pageRequestDto);
}