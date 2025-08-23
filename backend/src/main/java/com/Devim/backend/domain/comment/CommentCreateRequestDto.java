package com.Devim.backend.domain.comment;

import lombok.Data;

@Data
public class CommentCreateRequestDto {
    private long boardNo;
    private String commentContent;
}
