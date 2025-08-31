package com.Devim.backend.controller.likes;

import com.Devim.backend.jwt.JWTUserPrincipal;
import com.Devim.backend.service.likes.LikesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Likes Controller", description = "좋아요 기능 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/likes")
public class LikesController {

    private final LikesService likesService;

    @Operation(summary = "좋아요/좋아요 취소", description = "게시글 또는 댓글에 좋아요를 누르거나 취소합니다.",
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
            @AuthenticationPrincipal JWTUserPrincipal userPrincipal) {

        // TODO: targetType 유효성 검사 (board, comment 등)
        // TODO: targetId가 실제로 존재하는지 검사

        likesService.toggleLike(userPrincipal.getUserNo(), targetId, targetType);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "좋아요 상태 확인", description = "현재 사용자가 해당 게시글 또는 댓글에 좋아요를 눌렀는지 확인합니다.",
            parameters = {
                    @Parameter(name = "targetType", description = "좋아요 대상 타입 (board 또는 comment)", example = "board", required = true),
                    @Parameter(name = "targetId", description = "좋아요 대상 ID (게시글 번호 또는 댓글 번호)", example = "101", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공 (true: 좋아요 누름, false: 좋아요 안누름)")
    })
    @GetMapping("/{targetType}/{targetId}")
    public ResponseEntity<Boolean> checkLikeStatus(
            @PathVariable("targetType") String targetType,
            @PathVariable("targetId") long targetId,
            @AuthenticationPrincipal JWTUserPrincipal userPrincipal) {

        boolean isLiked = likesService.checkLikeStatus(userPrincipal.getUserNo(), targetId, targetType);
        return ResponseEntity.ok(isLiked);
    }
}
