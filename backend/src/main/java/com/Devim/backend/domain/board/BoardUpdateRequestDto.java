package com.Devim.backend.domain.board;

import lombok.Data;

@Data
public class BoardUpdateRequestDto {
    private String title;
    private String boardContent;
}
