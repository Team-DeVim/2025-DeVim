package com.Devim.backend.controller.auth;

import com.Devim.backend.domain.sign.SignUpRequestDto;
import com.Devim.backend.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUpProcess(SignUpRequestDto signUpRequestDto) {
        log.info(signUpRequestDto.getUsername());
        authService.signUpProcess(signUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

}
