package com.Devim.backend.domain.comment;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommentListResponseDto {
    private long commentNo;
    private String commentContent;
    private String writerName;
    private String profileImagePath;
    private LocalDateTime createdDt;
}
