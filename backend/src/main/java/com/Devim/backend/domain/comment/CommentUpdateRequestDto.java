package com.Devim.backend.domain.comment;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentUpdateRequestDto {

    @NotBlank(message = "댓글 내용은 비워둘 수 없습니다.")
    private String commentContent;
}
