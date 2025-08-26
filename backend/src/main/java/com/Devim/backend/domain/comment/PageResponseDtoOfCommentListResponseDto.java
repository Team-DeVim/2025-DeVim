package com.Devim.backend.domain.comment;

import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "PageResponseDtoOfCommentListResponseDto", description = "CommentListResponseDto 페이지 응답")
public class PageResponseDtoOfCommentListResponseDto extends PageResponseDto<CommentListResponseDto> {

    public PageResponseDtoOfCommentListResponseDto(List<CommentListResponseDto> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
        super(dtoList, pageRequestDTO, totalCount);
    }
}
