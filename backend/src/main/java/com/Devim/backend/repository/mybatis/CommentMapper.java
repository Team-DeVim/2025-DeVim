package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CommentMapper {

    void save(Comment comment);

    Optional<CommentListResponseDto> findById(@Param("commentNo") long commentNo);

    List<CommentListResponseDto> findByBoardId(@Param("boardNo") long boardNo, @Param("pageRequest") PageRequestDto pageRequest);

    long countByBoardId(@Param("boardNo") long boardNo);

    void update(Comment comment);

    void deleteById(@Param("commentNo") long commentNo);

    List<MonthlyCountDto> countMonthlyComments();

    List<CommentListResponseDto> findByUserNo(@Param("userNo") long userNo, @Param("pageRequest") PageRequestDto pageRequest);

    long countByUserNo(@Param("userNo") long userNo);

    List<CommentListResponseDto> findByUserNoDesc(@Param("userNo") long userNo, @Param("pageRequest") PageRequestDto pageRequest);
}
