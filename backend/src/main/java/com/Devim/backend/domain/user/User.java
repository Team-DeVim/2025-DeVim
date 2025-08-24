package com.Devim.backend.domain.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "roleList")
public class User {
	private long userNo;
	private String id;
	private String password;
	private String name;
	private boolean social;
	private String profileImagePath;
	private LocalDateTime createdDt;
	private boolean deleteFlag;
	
	private List<UserRole> roleList = new ArrayList<>();
	
}
