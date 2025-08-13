package com.Devim.backend.domain.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
	private int commentNo;
	private int boardNo;
	private String commentContent;
	private int writer;
	private String createdDt;
	private boolean deleteFlag;
}
