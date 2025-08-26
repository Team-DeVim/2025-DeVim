package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {

    void save(User user);

    Optional<User> findById(@Param("userNo") long userNo);

    Boolean existsByUsername(String username);

    Long findUserNoByUsername(@Param("username") String username);

    User findByUsername(@Param("username")String username);
  
    Optional<User> findByUserId(@Param("id") String id);

    List<User> findAll(PageRequestDto pageRequest);

    long countAllUsers();

    void update(User user);

    void deleteById(@Param("userNo") long userNo);

    void hardDeleteById(@Param("userNo") long userNo);

    void addRole(UserRole userRole);

    List<UserRankDto> findTop5ByBoardCount();

    List<UserRankDto> findTop5ByCommentCount();

    long countBoardsByUser(@Param("userNo") long userNo);

    long countCommentsByUser(@Param("userNo") long userNo);
}

