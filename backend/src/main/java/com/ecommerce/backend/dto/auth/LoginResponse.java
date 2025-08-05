package com.ecommerce.backend.dto.auth;

import com.ecommerce.backend.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String tokenType;
    private UserDto user;
}