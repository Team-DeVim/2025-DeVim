package com.Devim.backend.domain.user;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
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
	
	private String role;
	
	//private List<UserRole> roleList = new ArrayList<>();
	
}
