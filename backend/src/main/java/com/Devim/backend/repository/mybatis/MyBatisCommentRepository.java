package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.repository.CommentRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisCommentRepository implements CommentRepository {

    private final CommentMapper commentMapper;

    public MyBatisCommentRepository(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    @Override
    public void save(Comment comment) {
        commentMapper.save(comment);
    }

    @Override
    public Optional<CommentDto> findById(long commentNo) {
        return commentMapper.findById(commentNo);
    }

    @Override
    public List<CommentDto> findByBoardId(long boardNo) {
        return commentMapper.findByBoardId(boardNo);
    }

    @Override
    public void update(Comment comment) {
        commentMapper.update(comment);
    }

    @Override
    public void deleteById(long commentNo) {
        commentMapper.deleteById(commentNo);
    }
}
