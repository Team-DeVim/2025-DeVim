package com.Devim.backend.jwt;

import com.Devim.backend.domain.user.UserRole;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

import static java.nio.charset.StandardCharsets.*;

@Component
public class JWTUtil {

    private SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey  = new SecretKeySpec(secret.getBytes(UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    //검증 메서드 1
    public Long getUserNo(String token) {
        return Jwts.parser()
                .verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload()
                .get("userNo", Long.class);
    }

    //검증 메서드 2
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        return Jwts.parser()
                .verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload()
                .get("roles", List.class); // List<Object>로 리턴됨 -> 제네릭 타입 캐스팅 주의
    }

    //검증 메서드 3
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }





    public String createJwt(Long userNo, List<UserRole> roles, Long expiredMs) {

        List<String> roleNames = roles.stream()
                .map(UserRole::getRole)
                .toList();

        return Jwts.builder()
                .claim("userNo", userNo)
                .claim("roles", roleNames)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }


}
