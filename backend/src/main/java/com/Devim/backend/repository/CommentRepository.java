package com.Devim.backend.repository;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;
import java.util.Optional;

public interface CommentRepository {
    void save(Comment comment);
    
    Optional<CommentListResponseDto> findById(long commentNo);
    
    PageResponseDto<CommentListResponseDto> findByBoardId(long boardNo, PageRequestDto pageRequest);
    
    void update(Comment comment);
    
    void deleteById(long commentNo);

    List<MonthlyCountDto> countMonthlyComments();

    PageResponseDto<CommentListResponseDto> findByUserNo(long userNo, PageRequestDto pageRequest);

    PageResponseDto<CommentListResponseDto> findByUserNoDesc(long userNo, PageRequestDto pageRequest);
}