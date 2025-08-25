package com.Devim.backend.domain.board;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BoardListResponseDto {
    private long boardNo;
    private int boardTypeNo;
    private String title;
    private String writerName;
    private String profileImagePath;
    private LocalDateTime createdDt;
    private int likeCount;
    private int commentCount;
}
