package com.Devim.backend.service.board;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    Long create(Board board);

    BoardDto get(Long boardNo);

    PageResponseDto<BoardDto> list(String title, PageRequestDto pageRequestDto);

    List<BoardDto> listPopular(int limit);

    void update(Board board);

    void delete(Long boardNo);
}
