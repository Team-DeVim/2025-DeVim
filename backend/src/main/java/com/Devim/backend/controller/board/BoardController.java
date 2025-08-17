package com.Devim.backend.controller.board;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.service.board.BoardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Tag(name="Board Controller", description = "게시판 도메인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody Board board) {
        Long id = boardService.create(board);
        return ResponseEntity.created(URI.create("/api/boards/" + id)).build();
    }

    @GetMapping("/{boardNo}")
    public ResponseEntity<BoardDto> get(@PathVariable Long boardNo) {
        return ResponseEntity.ok(boardService.get(boardNo));
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<BoardDto>> list(@RequestParam String title,
                                                          @ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(boardService.list(title, pageRequestDto));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<BoardDto>> popular(@RequestParam(defaultValue = "4") int limit) {
        return ResponseEntity.ok(boardService.listPopular(limit));
    }

    @PatchMapping("/{boardNo}")
    public ResponseEntity<Void> update(@PathVariable Long boardNo,
                                       @Validated @RequestBody Board board) {
        board.setBoardNo(boardNo);
        boardService.update(board);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{boardNo}")
    public ResponseEntity<Void> delete(@PathVariable Long boardNo) {
        boardService.delete(boardNo);
        return ResponseEntity.noContent().build();
    }
}
