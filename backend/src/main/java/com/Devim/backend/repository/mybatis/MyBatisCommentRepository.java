package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
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
    public Optional<CommentListResponseDto> findById(long commentNo) {
        return commentMapper.findById(commentNo);
    }

    @Override
    public PageResponseDto<CommentListResponseDto> findByBoardId(long boardNo, PageRequestDto pageRequest) {
        List<CommentListResponseDto> dtoList = commentMapper.findByBoardId(boardNo, pageRequest);
        long totalCount = commentMapper.countByBoardId(boardNo);
        return new PageResponseDto<>(dtoList, pageRequest, totalCount);
    }

    @Override
    public void update(Comment comment) {
        commentMapper.update(comment);
    }

    @Override
    public void deleteById(long commentNo) {
        commentMapper.deleteById(commentNo);
    }

    @Override
    public List<MonthlyCountDto> countMonthlyComments() {
        return commentMapper.countMonthlyComments();
    }

    @Override
    public PageResponseDto<CommentListResponseDto> findByUserNo(long userNo, PageRequestDto pageRequest) {
        List<CommentListResponseDto> dtoList = commentMapper.findByUserNo(userNo, pageRequest);
        long totalCount = commentMapper.countByUserNo(userNo);
        return new PageResponseDto<>(dtoList, pageRequest, totalCount);
    }
}
