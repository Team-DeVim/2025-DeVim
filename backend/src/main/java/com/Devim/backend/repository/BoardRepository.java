package com.Devim.backend.repository;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;

import java.util.List;
import java.util.Optional;

public interface BoardRepository {
	void save(Board board);

	Optional<BoardDto> findById(long boardNo);

	// boardTypeNo는 필수가 아닌 선택값인데 int는 원시타입으로 null을 가질 수 없기 때문에 Integer 사용
	PageResponseDto<BoardDto> findAll(PageRequestDto pageRequest, Integer boardTypeNo);

	PageResponseDto<BoardDto> searchByTitle(PageRequestDto pageRequest, String title);

	void update(Board board);

	void deleteById(long boardNo);

    List<BoardDto> findPopularBoards(int limit);

    List<BoardDto> findRecent(Integer boardTypeNo, int limit);

    List<MonthlyCountDto> countMonthlyPosts();
}