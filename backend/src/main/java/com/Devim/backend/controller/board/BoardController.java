package com.Devim.backend.controller.board;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.common.PageResponseDtoOfBoardDto;
import com.Devim.backend.service.board.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(
            summary = "게시글 생성",
            description = "새 게시글을 생성합니다.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "게시글 생성 요청 바디",
                    content = @Content(schema = @Schema(implementation = Board.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "생성됨 (Location 헤더 포함)")
    })
    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody Board board) {
        Long id = boardService.create(board);
        return ResponseEntity.created(URI.create("/api/v1/boards/" + id)).build();
    }

    
    @Operation(
            summary = "게시글 단건 조회",
            description = "boardNo로 게시글을 조회합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = BoardDto.class)))
    })
    @GetMapping("/{boardNo}")
    public ResponseEntity<BoardDto> get(
            @io.swagger.v3.oas.annotations.Parameter(description = "게시글 번호", example = "101", required = true)
            @PathVariable Long boardNo) {
        return ResponseEntity.ok(boardService.get(boardNo));
    }


    @Operation(
	        summary = "게시글 목록(페이지)",
	        description = "게시글을 페이지네이션하여 조회합니다. 제목 키워드가 있으면 검색합니다.",
	        parameters = {
	                @io.swagger.v3.oas.annotations.Parameter(name = "title", description = "제목 검색 키워드 (선택 사항)", example = "test")
	        }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = PageResponseDtoOfBoardDto.class)))
    })
    @GetMapping
    public ResponseEntity<PageResponseDto<BoardDto>> list(@RequestParam(required = false) String title,
                                                          @RequestParam(required = false) Integer boardTypeNo,
                                                          @ModelAttribute PageRequestDto pageRequestDto) {
        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(boardService.search(title, pageRequestDto));
        } else {
            return ResponseEntity.ok(boardService.list(pageRequestDto, boardTypeNo));
        }
    }


    @Operation(
            summary = "인기 게시글 상위 N개",
            description = "좋아요 기준으로 인기 게시글을 조회합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "limit", description = "가져올 개수", example = "4")
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = BoardDto.class))))
    })
    @GetMapping("/popular")
    public ResponseEntity<List<BoardDto>> popular(@RequestParam(defaultValue = "4") int limit) {
        return ResponseEntity.ok(boardService.listPopular(limit));
    }

    
    @Operation(
            summary = "게시글 부분 수정",
            description = "게시글 일부 필드를 수정합니다(PATCH).",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "boardNo", description = "게시글 번호", example = "101", required = true)
            },
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "수정할 게시글(부분 필드만 포함 가능)",
                    content = @Content(schema = @Schema(implementation = Board.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "수정됨"),
    })
    @PatchMapping("/{boardNo}")
    public ResponseEntity<Void> update(@PathVariable("boardNo") Long boardNo,
                                       @Validated @RequestBody Board board) {
        board.setBoardNo(boardNo);
        boardService.update(board);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "최신 게시글 조회 (타입별)",
            description = "게시판 타입(boardTypeNo)과 개수(limit)를 지정하여 최신 게시글을 조회합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "boardTypeNo", description = "게시글 타입 번호", required = true, example = "1"),
                    @io.swagger.v3.oas.annotations.Parameter(name = "limit", description = "가져올 개수", example = "4")
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = BoardDto.class))))
    })
    @GetMapping("/recent")
    public ResponseEntity<List<BoardDto>> getRecent(
            @RequestParam("boardTypeNo") Integer boardTypeNo,
            @RequestParam(value = "limit", defaultValue = "4") int limit) {
        return ResponseEntity.ok(boardService.getRecent(boardTypeNo, limit));
    }

    
    @Operation(
            summary = "게시글 삭제",
            description = "게시글을 삭제합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "boardNo", description = "게시글 번호", example = "101", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제됨"),
    })
    @DeleteMapping("/{boardNo}")
    public ResponseEntity<Void> delete(@PathVariable("boardNo") Long boardNo) {
        boardService.delete(boardNo);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "월별 게시글 수 조회", description = "월별 게시글 작성 수를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/monthly-counts")
    public ResponseEntity<List<MonthlyCountDto>> getMonthlyBoardCounts() {
        return ResponseEntity.ok(boardService.countMonthlyPosts());
    }
}