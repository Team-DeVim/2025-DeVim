package com.Devim.backend.domain.common;

import com.Devim.backend.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "PageResponseDtoOfUser", description = "User 페이지 응답")
public class PageResponseDtoOfUser extends PageResponseDto<User> {
    public PageResponseDtoOfUser(List<User> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
        super(dtoList, pageRequestDTO, totalCount);
    }
}
