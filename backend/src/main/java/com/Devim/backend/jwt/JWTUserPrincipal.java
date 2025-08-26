package com.Devim.backend.jwt;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class JWTUserPrincipal {
    public Long userNo;
    public List<String> roles;
}
