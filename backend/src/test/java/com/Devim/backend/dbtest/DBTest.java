package com.Devim.backend.dbtest;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
public class DBTest {

    @Test
    @DisplayName("DB연동 테스트")
    void printDb() {
        log.info("===========");
        log.info("hello World");
        log.info("===========");
    }
}
