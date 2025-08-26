package com.Devim.backend.domain.user;

import lombok.Data;

@Data
public class UserSummaryResponseDto {
    private long userNo;
    private String id;
    private String name;
    private String profileImagePath;
    private long postCount;
    private long commentCount;
}
