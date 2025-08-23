package com.Devim.backend.service.comment;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentCreateRequestDto;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.comment.CommentUpdateRequestDto;
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
    public Long create(CommentCreateRequestDto requestDto, Long userNo) {
        Comment comment = new Comment();
        comment.setBoardNo(requestDto.getBoardNo());
        comment.setCommentContent(requestDto.getCommentContent());
        comment.setWriter(userNo.intValue()); // Assuming writer is int type
        commentRepository.save(comment);
        return comment.getCommentNo();
    }

    @Override
    public CommentListResponseDto get(Long commentNo) {
        return commentRepository.findById(commentNo)
                .orElseThrow(() -> new NoSuchElementException("Comment not Found" + commentNo));
    }

    @Override
    public PageResponseDto<CommentListResponseDto> listByBoard(Long boardNo, PageRequestDto pageRequestDto) {
        return commentRepository.findByBoardId(boardNo, pageRequestDto);
    }

    @Override
    @Transactional
    public void update(Long commentNo, CommentUpdateRequestDto requestDto) {
        Comment comment = new Comment();
        comment.setCommentNo(commentNo);
        comment.setCommentContent(requestDto.getCommentContent());
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
