package com.Devim.backend.domain.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardType {
	private long boardTypeNo;
	private String boardName;
}
