package com.Devim.backend.domain.board;

import java.time.LocalDateTime;

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
	private long writer;
	private LocalDateTime createdDt;
	private boolean deleteFlag;
}
