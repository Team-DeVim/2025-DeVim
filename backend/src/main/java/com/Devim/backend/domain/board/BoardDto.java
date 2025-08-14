package com.Devim.backend.domain.board;

import java.util.Date;

import lombok.Data;

@Data
public class BoardDto {
	private long boardNo;
	private int boardTypeNo;
	private String title;
	private String boardContent;
	private String writerName;
	private Date createdDt;
	private boolean deleteFlag;
	private int likeCount;
}
