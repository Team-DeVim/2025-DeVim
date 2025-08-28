package com.Devim.backend.domain.sign;

import com.Devim.backend.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoleList().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole()))
                .toList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    public Long getUserNo() {
        return user.getUserNo();
    }


    @Override
    public String getUsername() {
        return user.getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
