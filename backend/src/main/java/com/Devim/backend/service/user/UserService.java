package com.Devim.backend.service.user;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;

public interface UserService {
    Long create(User user);

    User get(Long userNo);

    PageResponseDto<User> list(PageRequestDto pageRequestDto);

    void update(User user);

    void delete(Long userNo);
}
