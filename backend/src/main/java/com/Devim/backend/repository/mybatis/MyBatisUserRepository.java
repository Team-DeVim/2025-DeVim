package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;
import com.Devim.backend.domain.user.UserRole;
import com.Devim.backend.repository.UserRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisUserRepository implements UserRepository {

    private final UserMapper userMapper;

    public MyBatisUserRepository(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void save(User user) {
        userMapper.save(user);
    }

    @Override
    public Optional<User> findById(long userNo) {
        return userMapper.findById(userNo);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userMapper.existsByUsername(username);
    }

    @Override
    public Long findUserNoByUsername(String username) {
        return userMapper.findUserNoByUsername(username);
    }

    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }


    @Override
    public PageResponseDto<User> findAll(PageRequestDto pageRequest) {
        List<User> dtoList = userMapper.findAll(pageRequest);
        long totalCount = userMapper.countAllUsers();
        return new PageResponseDto<>(dtoList, pageRequest, totalCount);
    }

    @Override
    public void update(User user) {
        userMapper.update(user);
    }

    @Override
    public void deleteById(long userNo) {
        userMapper.deleteById(userNo);
    }

    @Override
    public void hardDeleteById(long userNo) {
        userMapper.hardDeleteById(userNo);
    }

    @Override
    public void addRole(UserRole userRole) {
        userMapper.addRole(userRole);
    }

    @Override
    public List<UserRankDto> findTop5ByBoardCount() {
        return userMapper.findTop5ByBoardCount();
    }

    @Override
    public List<UserRankDto> findTop5ByCommentCount() {
        return userMapper.findTop5ByCommentCount();
    }
}
