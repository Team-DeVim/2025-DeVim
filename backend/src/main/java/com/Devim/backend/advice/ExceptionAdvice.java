package com.Devim.backend.advice;

import com.Devim.backend.exception.DuplicateUsernameException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<ApiError> handleDuplicate(DuplicateUsernameException ex) {
        ApiError body = new ApiError(
                HttpStatus.CONFLICT.value(),
                "USERNAME_CONFLICT",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }


    @Data
    @AllArgsConstructor
     public static class ApiError {
        private int status;
        private String code;
        private String message;
    }


}