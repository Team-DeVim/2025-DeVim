package com.Devim.backend.domain.common;

import com.Devim.backend.domain.board.BoardDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "PageResponseDtoOfBoardDto", description = "BoardDto 페이지 응답")
public class PageResponseDtoOfBoardDto extends PageResponseDto<BoardDto>{

    public PageResponseDtoOfBoardDto(List<BoardDto> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
        super(dtoList, pageRequestDTO, totalCount);
    }
}
