package com.Devim.backend.domain.board;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "PageResponseDtoOfBoardListResponseDto", description = "BoardListResponseDto 페이지 응답")
public class PageResponseDtoOfBoardListResponseDto extends PageResponseDto<BoardListResponseDto> {

    public PageResponseDtoOfBoardListResponseDto(List<BoardListResponseDto> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
        super(dtoList, pageRequestDTO, totalCount);
    }
}
