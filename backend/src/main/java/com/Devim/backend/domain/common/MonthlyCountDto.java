package com.Devim.backend.domain.common;

import lombok.Data;

@Data
public class MonthlyCountDto {
    private int year;
    private int month;
    private long count;
}
