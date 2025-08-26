package com.Devim.backend.domain.user;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class User {
	private long userNo;
	private String id;
	private String password;
	private String name;
	private boolean social;
	private String profileImagePath;
	private LocalDateTime createdDt;
	private boolean deleteFlag;
	private List<UserRole> roleList;
}
