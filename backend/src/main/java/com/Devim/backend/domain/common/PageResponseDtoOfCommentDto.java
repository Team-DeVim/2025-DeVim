package com.Devim.backend.domain.common;

import com.Devim.backend.domain.comment.CommentDto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(name = "PageResponseDtoOfCommentDto", description = "CommentDto 페이지 응답")
public class PageResponseDtoOfCommentDto extends PageResponseDto<CommentDto> {
    public PageResponseDtoOfCommentDto(List<CommentDto> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
        super(dtoList, pageRequestDTO, totalCount);
    }
}
