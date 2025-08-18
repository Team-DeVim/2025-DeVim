package com.Devim.backend.domain.mainimage;

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
	private String createdDt;
}
