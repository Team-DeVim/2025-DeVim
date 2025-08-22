package com.Devim.backend.domain.board;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BoardDto {
	private long boardNo;
	private int boardTypeNo;
	private String title;
	private String boardContent;
	private String writerName;
	private LocalDateTime createdDt;
	private boolean deleteFlag;
	private int likeCount;
}
