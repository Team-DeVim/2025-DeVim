package com.Devim.backend.domain.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
	private long boardNo;
	private int boardTypeNo;
	private String title;
	private String boardContent;
	private int writer;
	private String createdDt;
	private boolean deleteFlag;
}
