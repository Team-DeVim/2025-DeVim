package com.Devim.backend.controller.likes;

import com.Devim.backend.service.likes.LikesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Likes Controller", description = "좋아요 기능 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikesController {

    private final LikesService likesService;

    @Operation(summary = "좋아요/좋아요 취소", description = "게시글 또는 댓글에 좋아요를 누르거나 취소합니다. (임시: X-USER-NO 헤더로 사용자 ID 전달)",
            parameters = {
                    @Parameter(name = "targetType", description = "좋아요 대상 타입 (board 또는 comment)", example = "board", required = true),
                    @Parameter(name = "targetId", description = "좋아요 대상 ID (게시글 번호 또는 댓글 번호)", example = "101", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "404", description = "대상을 찾을 수 없음")
    })
    @PostMapping("/{targetType}/{targetId}")
    public ResponseEntity<Void> toggleLike(
            @PathVariable("targetType") String targetType,
            @PathVariable("targetId") long targetId,
            @RequestHeader("X-USER-NO") Long userNo) {

        // TODO: targetType 유효성 검사 (board, comment 등)
        // TODO: targetId가 실제로 존재하는지 검사

        likesService.toggleLike(userNo, targetId, targetType);
        return ResponseEntity.ok().build();
    }
}
