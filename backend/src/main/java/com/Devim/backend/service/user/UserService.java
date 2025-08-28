package com.Devim.backend.service.user;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;
import com.Devim.backend.domain.user.UserSummaryResponseDto;

public interface UserService {
    Long create(User user);

    User get(Long userNo);

    User getByUserId(String id);

    PageResponseDto<User> list(PageRequestDto pageRequestDto);

    void update(User user);

    void delete(Long userNo);

    void hardDelete(Long userNo);

    void reactivate(Long userNo);

    String uploadProfileImage(long userNo, MultipartFile file) throws IOException;

    byte[] getThumbnail(long userNo, int width, int height) throws IOException;

    UserSummaryResponseDto getUserSummary(long userNo);

    List<UserRankDto> findTop5ByBoardCount();

    List<UserRankDto> findTop5ByCommentCount();
}
