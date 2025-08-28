package com.Devim.backend.domain.sign;

import lombok.Data;

@Data
public class SignUpRequestDto {

    private String username;

    private String password;

    private String name;
}
