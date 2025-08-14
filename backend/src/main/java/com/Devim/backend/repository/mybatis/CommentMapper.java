package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CommentMapper {

    void save(Comment comment);

    Optional<CommentDto> findById(long commentNo);

    List<CommentDto> findByBoardId(long boardNo);

    void update(Comment comment);

    void deleteById(long commentNo);
}

