package com.Devim.backend.controller.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthTestController {

    @GetMapping("/")
    public String mainP() {
        return "main Test Controller";
    }

    @GetMapping("/admin")
    public String adminP() {
        return "admin Controller";
    }
}
