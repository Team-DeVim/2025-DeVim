package com.Devim.backend.repository;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.user.User;
import com.Devim.backend.domain.user.UserRankDto;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
	void save(User user);

	Optional<User> findById(long userNo);

	PageResponseDto<User> findAll(PageRequestDto pageRequest);

	void update(User user);

	void deleteById(long userNo);

	List<UserRankDto> findTop5ByBoardCount();

	List<UserRankDto> findTop5ByCommentCount();
}
