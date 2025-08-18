package com.Devim.backend.domain.user;

import java.util.Date;
import java.util.List;

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
	private Date createdDt;
	private boolean deleteFlag;
	
	private List<UserRole> roleList;
}
