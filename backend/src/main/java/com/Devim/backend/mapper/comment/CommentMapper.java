package com.Devim.backend.mapper.comment;

import com.Devim.backend.domain.comment.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CommentMapper {

    void save(Comment comment);

    Optional<Comment> findById(long commentNo);

    List<Comment> findByBoardId(long boardNo);

    void update(Comment comment);

    void deleteById(long commentNo);
}

