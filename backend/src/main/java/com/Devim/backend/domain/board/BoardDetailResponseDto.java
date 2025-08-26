package com.Devim.backend.domain.board;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BoardDetailResponseDto {
    private long boardNo;
    private int boardTypeNo;
    private String title;
    private String boardContent;
    private String writerName;
    private String profileImagePath;
    private LocalDateTime createdDt;
    private int likeCount;
    private int commentCount;
    private boolean isLiked;
}
