package com.Devim.backend.domain.comment;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
	private long commentNo;
	private long boardNo;
	private String commentContent;
	private long writer;
	private LocalDateTime createdDt;
	private boolean deleteFlag;
}
