package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.auth.RegisterRequest;

public interface AuthService {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    void registerUser(RegisterRequest registerRequest);
}