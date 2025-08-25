package com.Devim.backend.domain.likes;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Likes {
	private long likeNo;
	private long userNo;
	private long targetId;
	private String targetType;
	private LocalDateTime createdDt;
}
