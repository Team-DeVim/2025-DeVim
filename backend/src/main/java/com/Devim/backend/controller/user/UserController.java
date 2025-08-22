package com.Devim.backend.controller.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name="User Controller", description = "유저 도메인 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

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

    
    @Operation(summary = "사용자 단건 조회", description = "userNo로 사용자를 조회합니다.",
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
}