package com.Devim.backend.domain.comment;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
	private long commentNo;
	private int boardNo;
	private String commentContent;
	private int writer;
	private Date createdDt;
	private boolean deleteFlag;
}
