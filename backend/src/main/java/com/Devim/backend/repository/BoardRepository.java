package com.Devim.backend.repository;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;
import java.util.Optional;

public interface BoardRepository {
	void save(Board board);

	Optional<BoardDto> findById(long boardNo);

	PageResponseDto<BoardDto> findAll(PageRequestDto pageRequest);

	PageResponseDto<BoardDto> searchByTitle(PageRequestDto pageRequest, String title);

	void update(Board board);

	void deleteById(long boardNo);

    List<BoardDto> findPopularBoards(int limit);
}
