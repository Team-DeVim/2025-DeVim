package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;

import com.Devim.backend.domain.common.PageRequestDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CommentMapper {

    void save(Comment comment);

    Optional<CommentDto> findById(long commentNo);

    List<CommentDto> findByBoardId(@Param("boardNo") long boardNo, @Param("pageRequest") PageRequestDto pageRequest);

    long countByBoardId(long boardNo);

    void update(Comment comment);

    void deleteById(long commentNo);

