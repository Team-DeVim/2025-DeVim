package com.Devim.backend.domain.comment;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommentListResponseDto {
    private long commentNo;
    private long boardNo;
    private int boardTypeNo;
    private String commentContent;
    private String writerName;
    private long writerUserNo; // Writer's userNo
    private String profileImagePath;
    private LocalDateTime createdDt;
}
