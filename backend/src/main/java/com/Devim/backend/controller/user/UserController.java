package com.Devim.backend.controller.user;

import com.Devim.backend.domain.board.BoardListResponseDto;
import com.Devim.backend.domain.comment.CommentListResponseDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;
import com.Devim.backend.domain.user.UserSummaryResponseDto;
import com.Devim.backend.service.board.BoardService;
import com.Devim.backend.service.comment.CommentService;
import com.Devim.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@Tag(name="User Controller", description = "유저 도메인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final BoardService boardService;
    private final CommentService commentService;

    @Operation(summary = "사용자 생성", description = "새로운 사용자를 생성합니다.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "생성할 사용자 정보", required = true,
                    content = @Content(schema = @Schema(implementation = User.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "생성됨")
    })
    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody User user) {
        Long id = userService.create(user);
        return ResponseEntity.created(URI.create("/api/v1/users/")).build();
    }

    @Operation(summary = "사용자 단건 조회 (by userNo)", description = "userNo로 사용자를 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/{userNo}")
    public ResponseEntity<User> get(@PathVariable("userNo") Long userNo) {
        return ResponseEntity.ok(userService.get(userNo));
    }

    @Operation(summary = "사용자 단건 조회 (by id)", description = "로그인 ID로 사용자를 조회합니다.",
            parameters = {
                    @Parameter(name = "id", description = "로그인 ID", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/by-id/{id}")
    public ResponseEntity<User> getByUserId(@PathVariable("id") String id) {
        return ResponseEntity.ok(userService.getByUserId(id));
    }

    @Operation(summary = "사용자 목록 조회", description = "사용자 목록을 페이지네이션하여 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping
    public ResponseEntity<PageResponseDto<User>> list(@ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(userService.list(pageRequestDto));
    }

    @Operation(summary = "사용자 정보 수정", description = "사용자 정보를 부분 수정합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            },
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "수정할 사용자 정보", required = true,
                    content = @Content(schema = @Schema(implementation = User.class))
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "수정됨")
    })
    @PatchMapping("/{userNo}")
    public ResponseEntity<Void> update(@PathVariable("userNo") Long userNo, @Validated @RequestBody User user) {
        user.setUserNo(userNo);
        userService.update(user);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "사용자 소프트 삭제", description = "사용자 정보를 논리적으로 삭제합니다 (delete_flag = 1).",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제됨")
    })
    @DeleteMapping("/{userNo}")
    public ResponseEntity<Void> delete(@PathVariable("userNo") Long userNo) {
        userService.delete(userNo);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "사용자 하드 삭제", description = "사용자 정보를 데이터베이스에서 완전히 삭제합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제됨")
    })
    @DeleteMapping("/{userNo}/force")
    public ResponseEntity<Void> hardDelete(@PathVariable("userNo") Long userNo) {
        userService.hardDelete(userNo);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "프로필 이미지 업로드", description = "사용자의 프로필 이미지를 업로드합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "업로드 성공")
    })
    @PostMapping("/{userNo}/profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable("userNo") long userNo, @RequestParam("file") MultipartFile file) throws IOException {
        String filePath = userService.uploadProfileImage(userNo, file);
        return ResponseEntity.created(URI.create("/api/v1/users/" + userNo)).body(filePath);
    }

    @Operation(summary = "프로필 썸네일 조회", description = "사용자의 프로필 이미지 썸네일을 동적으로 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true),
                    @Parameter(name = "width", description = "썸네일 너비", required = false),
                    @Parameter(name = "height", description = "썸네일 높이", required = false)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자 또는 이미지를 찾을 수 없음")
    })
    @GetMapping("/{userNo}/thumbnail")
    public ResponseEntity<byte[]> getThumbnail(@PathVariable("userNo") long userNo,
                                             @RequestParam(value = "width", defaultValue = "150") int width,
                                             @RequestParam(value = "height", defaultValue = "150") int height) throws IOException {
        byte[] thumbnailBytes = userService.getThumbnail(userNo, width, height);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok().headers(headers).body(thumbnailBytes);
    }

    @Operation(summary = "사용자 요약 정보 조회", description = "사용자의 게시글 및 댓글 수 등 요약 정보를 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    @GetMapping("/{userNo}/summary")
    public ResponseEntity<UserSummaryResponseDto> getUserSummary(@PathVariable("userNo") long userNo) {
        return ResponseEntity.ok(userService.getUserSummary(userNo));
    }

    @Operation(summary = "사용자별 게시글 목록 조회", description = "특정 사용자가 작성한 게시글 목록을 페이지네이션하여 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true),
                    @Parameter(name = "page", description = "페이지 번호", required = false, example = "1"),
                    @Parameter(name = "size", description = "페이지당 게시글 수", required = false, example = "10")
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    @GetMapping("/{userNo}/posts")
    public ResponseEntity<PageResponseDto<BoardListResponseDto>> getUserPosts(
            @PathVariable("userNo") Long userNo,
            @ModelAttribute PageRequestDto pageRequestDto) {
        // boardTypeNo는 null로 전달하여 모든 게시판 타입의 글을 가져오도록 함
        return ResponseEntity.ok(boardService.list(pageRequestDto, null, userNo));
    }

    @Operation(summary = "사용자별 댓글 목록 조회", description = "특정 사용자가 작성한 댓글 목록을 페이지네이션하여 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true),
                    @Parameter(name = "page", description = "페이지 번호", required = false, example = "1"),
                    @Parameter(name = "size", description = "페이지당 댓글 수", required = false, example = "10")
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    @GetMapping("/{userNo}/comments")
    public ResponseEntity<PageResponseDto<CommentListResponseDto>> getUserComments(
            @PathVariable("userNo") long userNo,
            @ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(commentService.getCommentsByUser(userNo, pageRequestDto));
    }

    @Operation(summary = "사용자별 댓글 목록 조회 (최신순)", description = "특정 사용자가 작성한 댓글 목록을 최신순으로 페이지네이션하여 조회합니다.",
            parameters = {
                    @Parameter(name = "userNo", description = "사용자 번호", required = true),
                    @Parameter(name = "page", description = "페이지 번호", required = false, example = "1"),
                    @Parameter(name = "size", description = "페이지당 댓글 수", required = false, example = "10")
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음")
    })
    @GetMapping("/{userNo}/comments/desc")
    public ResponseEntity<PageResponseDto<CommentListResponseDto>> getUserCommentsDesc(
            @PathVariable("userNo") long userNo,
            @ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(commentService.getCommentsByUserDesc(userNo, pageRequestDto));
    }

    @Operation(summary = "게시글 작성수 TOP 5 사용자 조회", description = "게시글을 가장 많이 작성한 사용자 5명을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/rank/boards")
    public ResponseEntity<List<UserRankDto>> getTop5ByBoardCount() {
        return ResponseEntity.ok(userService.findTop5ByBoardCount());
    }

    @Operation(summary = "댓글 작성수 TOP 5 사용자 조회", description = "댓글을 가장 많이 작성한 사용자 5명을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping("/rank/comments")
    public ResponseEntity<List<UserRankDto>> getTop5ByCommentCount() {
        return ResponseEntity.ok(userService.findTop5ByCommentCount());
    }
}