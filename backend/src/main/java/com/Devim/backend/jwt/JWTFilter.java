package com.Devim.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");
        //JWT 토큰에 대한 검증 실행 - 1
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            log.info("===[Token is Null]===");
            filterChain.doFilter(request, response);

            return;
        }
        String token = authorization.split(" ")[1];

        //JWT 토큰에 대한 검증 실행 2
        if (jwtUtil.isExpired(token)) {
            log.info("===token is Expired===");
            filterChain.doFilter(request, response);
            return;
        }

        List<String> roles = jwtUtil.getRoles(token);
        Long userNo = jwtUtil.getUserNo(token);

        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            //Principal
            JWTUserPrincipal principal = new JWTUserPrincipal(userNo, roles);

            //권한 변환
            Collection<? extends GrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role))
                    .distinct()
                    .toList();

            //Authentication
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(principal, null, authorities);


            //매 요청마다 SecurityContext 생성
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

        }
        filterChain.doFilter(request, response);

    }
}
