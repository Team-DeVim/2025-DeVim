package com.Devim.backend.service.board;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;

public interface BoardService {
    Long create(Board board);

    BoardDto get(Long boardNo);

    // boardTypeNo는 필수가 아닌 선택값인데 int는 원시타입으로 null을 가질 수 없기 때문에 Integer 사용
    PageResponseDto<BoardDto> list(PageRequestDto pageRequestDto, Integer boardTypeNo);

    PageResponseDto<BoardDto> search(String title, PageRequestDto pageRequestDto);

    List<BoardDto> listPopular(int limit);

    void update(Board board);

    void delete(Long boardNo);

    List<BoardDto> getRecent(Integer boardTypeNo, int limit);

    List<MonthlyCountDto> countMonthlyPosts();
}