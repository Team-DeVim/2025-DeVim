package com.Devim.backend.domain.mainimage;

import lombok.Data;

@Data
public class MainImageResetRequestDto {
    private String filePath;
    private String thumbnailPath;
    private int priority;
}
