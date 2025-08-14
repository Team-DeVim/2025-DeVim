package com.Devim.backend.domain.comment;

import lombok.Data;

@Data
public class CommentDto {
    private long commentNo;
    private int boardNo;
    private String commentContent;
    private String writerName; // From user table
    private String createdDt;
    private boolean deleteFlag;
}
