package com.Devim.backend.domain.board;

import lombok.Data;

@Data
public class BoardCreateRequestDto {
    private int boardTypeNo;
    private String title;
    private String boardContent;
}
