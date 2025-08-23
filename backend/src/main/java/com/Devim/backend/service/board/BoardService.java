package com.Devim.backend.service.board;

import com.Devim.backend.domain.board.BoardCreateRequestDto;
import com.Devim.backend.domain.board.BoardDetailResponseDto;
import com.Devim.backend.domain.board.BoardListResponseDto;
import com.Devim.backend.domain.board.BoardUpdateRequestDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;

import java.util.List;

public interface BoardService {
    Long create(BoardCreateRequestDto requestDto, Long userNo);

    BoardDetailResponseDto get(Long boardNo, Long currentUserNo);

    // boardTypeNo는 필수가 아닌 선택값인데 int는 원시타입으로 null을 가질 수 없기 때문에 Integer 사용
    PageResponseDto<BoardListResponseDto> list(PageRequestDto pageRequestDto, Integer boardTypeNo);

    PageResponseDto<BoardListResponseDto> search(String title, PageRequestDto pageRequestDto);

    List<BoardListResponseDto> listPopular(int limit);

    void update(Long boardNo, BoardUpdateRequestDto requestDto);

    void delete(Long boardNo);

    List<BoardListResponseDto> getRecent(Integer boardTypeNo, int limit);

    List<MonthlyCountDto> countMonthlyPosts();
}