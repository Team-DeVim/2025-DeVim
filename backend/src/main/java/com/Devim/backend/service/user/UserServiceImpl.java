package com.Devim.backend.service.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.repository.UserRepository;
import com.Devim.backend.repository.mybatis.MyBatisUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long create(User user) {
        userRepository.save(user);
        return user.getUserNo();
    }

    @Override
    public User get(Long userNo) {
        return userRepository.findById(userNo)
                .orElseThrow(()-> new NoSuchElementException("User not found :" + userNo));
    }

    @Override
    public PageResponseDto<User> list(PageRequestDto pageRequestDto) {
        return userRepository.findAll(pageRequestDto);
    }

    @Override
    @Transactional
    public void update(User user) {
        userRepository.update(user);
    }

    @Override
    public void delete(Long userNo) {
        userRepository.deleteById(userNo);
    }
}
