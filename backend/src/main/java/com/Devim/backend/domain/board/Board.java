package com.Devim.backend.domain.board;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
	private int boardNo;
	private int boardTypeNo;
	private String title;
	private String boardContent;
	private int writer;
	private String createdDt;
	private boolean deleteFlag;
}
