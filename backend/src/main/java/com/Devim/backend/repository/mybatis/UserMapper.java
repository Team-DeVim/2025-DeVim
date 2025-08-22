package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;
import com.Devim.backend.domain.user.UserRole;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {

    void save(User user);

    Optional<User> findById(long userNo);

    List<User> findAll(PageRequestDto pageRequest);

    long countAllUsers();

    void update(User user);

    void deleteById(long userNo);

    void hardDeleteById(long userNo);

    void addRole(UserRole userRole);

    List<UserRankDto> findTop5ByBoardCount();

    List<UserRankDto> findTop5ByCommentCount();
}

