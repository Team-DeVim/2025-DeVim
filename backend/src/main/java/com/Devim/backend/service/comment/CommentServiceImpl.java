package com.Devim.backend.service.comment;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    @Override
    @Transactional
    public Long create(Comment comment) {
        commentRepository.save(comment);
        return comment.getCommentNo();
    }

    @Override
    public CommentDto get(Long commentNo) {
        return commentRepository.findById(commentNo)
                .orElseThrow(() -> new NoSuchElementException("Comment not Found" + commentNo));
    }

        @Override
    public PageResponseDto<CommentDto> listByBoard(Long boardNo, PageRequestDto pageRequestDto) {
        return commentRepository.findByBoardId(boardNo, pageRequestDto);
    }

    @Override
    @Transactional
    public void update(Comment comment) {
        commentRepository.update(comment);
    }

    @Override
    @Transactional
    public void delete(Long commentNo) {
        commentRepository.deleteById(commentNo);

    }

    @Override
    public List<MonthlyCountDto> countMonthlyComments() {
        return commentRepository.countMonthlyComments();
    }
}
