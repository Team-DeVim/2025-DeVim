package com.Devim.backend.service.auth;

import com.Devim.backend.domain.sign.SignUpRequestDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void signUpProcess(SignUpRequestDto signUpRequestDto) {
        String username = signUpRequestDto.getUsername();
        String password = signUpRequestDto.getPassword();
        String name = signUpRequestDto.getName();

        Boolean isExist = userRepository.existsByUsername(name);

        if (isExist) {
            return;
        }

        User newUser = new User();
        newUser.setId(username);
        newUser.setPassword(bCryptPasswordEncoder.encode(password));
        newUser.setName(name);
        userRepository.save(newUser);
        userRepository.addRole();

    }
}
