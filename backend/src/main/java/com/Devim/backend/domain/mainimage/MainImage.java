package com.Devim.backend.domain.mainimage;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MainImage {
	private long imageNo;
	private String filePath;
	private String thumbnailPath;
	private int priority;
	private LocalDateTime createdDt;
}
