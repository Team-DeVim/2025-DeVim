package com.Devim.backend.controller.comment;


import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody Comment comment) {
        Long id = commentService.create(comment);
        return ResponseEntity.created(URI.create("/api/comments/" + id)).build();
    }

    @GetMapping("/{commentNo}")
    public ResponseEntity<CommentDto> get(@PathVariable Long commentNo) {
        return ResponseEntity.ok(commentService.get(commentNo));
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<CommentDto>> listByBoard(@RequestParam Long boardNo,
                                                                   @ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(commentService.listByBoard(boardNo, pageRequestDto));
    }

    @PatchMapping("/{commentNo}")
    public ResponseEntity<Void> update(@PathVariable Long commentNo,
                                       @Validated Comment comment) {
        comment.setCommentNo(commentNo);
        commentService.update(comment);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{commentNo}")
    public ResponseEntity<Void> delete(@PathVariable Long commentNo) {
        commentService.delete(commentNo);
        return ResponseEntity.noContent().build();
    }
}
