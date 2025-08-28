package com.Devim.backend.domain.sign;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
