package com.Devim.backend.controller.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @PostMapping
    public ResponseEntity<Void> create(@Validated @RequestBody User user) {
        Long id = userService.create(user);
        return ResponseEntity.created(URI.create("/api/users/")).build();
    }

    @GetMapping("/{userNo}")
    public ResponseEntity<User> get(@PathVariable Long userNo) {
        return ResponseEntity.ok(userService.get(userNo));
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<User>> list(@ModelAttribute PageRequestDto pageRequestDto) {
        return ResponseEntity.ok(userService.list(pageRequestDto));
    }

    @PatchMapping("/{userNo}")
    public ResponseEntity<Void> update(@PathVariable Long userNo, @Validated @RequestBody User user) {
        user.setUserNo(userNo);
        userService.update(user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userNo}")
    public ResponseEntity<Void> delete(@PathVariable Long userNo) {
        userService.delete(userNo);
        return ResponseEntity.noContent().build();
    }
}
