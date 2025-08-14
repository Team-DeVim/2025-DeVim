package com.Devim.backend.domain.comment;

import java.util.Date;

import lombok.Data;

@Data
public class CommentDto {
    private long commentNo;
    private int boardNo;
    private String commentContent;
    private String writerName; // From user table
    private Date createdDt;
    private boolean deleteFlag;
}
