package com.Devim.backend.controller.comment;

import com.Devim.backend.domain.comment.Comment;
import com.Devim.backend.domain.comment.CommentDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.common.PageResponseDtoOfCommentDto;
import com.Devim.backend.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
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

@Tag(name="Comment Controller", description = "댓글 도메인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    @Operation(
            summary = "댓글 생성",
            description = "새 댓글을 생성합니다.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "댓글 생성 요청 바디",
                    content = @Content(schema = @Schema(implementation = Comment.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "생성됨 (Location 헤더 포함)")
    })
    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody Comment comment) {
        Long id = commentService.create(comment);
        return ResponseEntity.created(URI.create("/api/v1/comments/" + id)).build();
    }

    @Operation(
            summary = "댓글 단건 조회",
            description = "commentNo로 댓글을 조회합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "commentNo", description = "댓글 번호", example = "1", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = CommentDto.class))),
    })
    @GetMapping("/{commentNo}")
    public ResponseEntity<CommentDto> get(@PathVariable("commentNo") Long commentNo) {
        return ResponseEntity.ok(commentService.get(commentNo));
    }

    @Operation(
            summary = "특정 게시글의 댓글 목록(페이지)",
            description = "boardNo에 해당하는 댓글을 페이지네이션하여 조회합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "boardNo", description = "게시글 번호", example = "101", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(schema = @Schema(implementation = PageResponseDtoOfCommentDto.class)))
    })
    @GetMapping
    public ResponseEntity<PageResponseDto<CommentDto>> listByBoard(@RequestParam("boardNo") Long boardNo,
                                                                   @ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(commentService.listByBoard(boardNo, pageRequestDto));
    }

    @Operation(
            summary = "댓글 부분 수정",
            description = "댓글 일부 필드를 수정합니다(PATCH).",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "commentNo", description = "댓글 번호", example = "1", required = true)
            },
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "수정할 댓글(부분 필드만 포함 가능)",
                    content = @Content(schema = @Schema(implementation = Comment.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "수정됨"),
    })
    @PatchMapping("/{commentNo}")
    public ResponseEntity<Void> update(@PathVariable("commentNo") Long commentNo,
                                       @Validated @RequestBody Comment comment) {
        comment.setCommentNo(commentNo);
        commentService.update(comment);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "댓글 삭제",
            description = "댓글을 삭제합니다.",
            parameters = {
                    @io.swagger.v3.oas.annotations.Parameter(name = "commentNo", description = "댓글 번호", example = "1", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제됨"),
    })
    @DeleteMapping("/{commentNo}")
    public ResponseEntity<Void> delete(@PathVariable("commentNo") Long commentNo) {
        commentService.delete(commentNo);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "월별 댓글 수 조회", description = "월별 댓글 작성 수를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/monthly-counts")
    public ResponseEntity<List<MonthlyCountDto>> getMonthlyCommentCounts() {
        return ResponseEntity.ok(commentService.countMonthlyComments());
    }
}
