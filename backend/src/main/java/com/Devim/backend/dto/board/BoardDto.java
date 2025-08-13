package com.Devim.backend.dto.board;

import lombok.Data;

@Data
public class BoardDto {
	private long boardNo;
	private int boardTypeNo;
	private String title;
	private String boardContent;
	private String writerName;
	private String createdDt;
	private boolean deleteFlag;
	private int likeCount;
}
