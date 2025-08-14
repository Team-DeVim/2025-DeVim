package com.Devim.backend.mapper.user;

import com.Devim.backend.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {

    void save(User user);

    Optional<User> findById(long userNo);

    List<User> findAll();

    void update(User user);

    void deleteById(long userNo);
}

