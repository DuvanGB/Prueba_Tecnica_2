package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ApiResponse;
import com.ecommerce.backend.dto.UserDto;
import com.ecommerce.backend.dto.auth.LoginRequest;
import com.ecommerce.backend.dto.auth.LoginResponse;
import com.ecommerce.backend.dto.auth.RegisterRequest;
import com.ecommerce.backend.security.JwtTokenProvider;
import com.ecommerce.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.backend.security.UserPrincipal;
import jakarta.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UserDto userDto = convertToUserDto(userPrincipal);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new LoginResponse(jwt, "Bearer", userDto));
    }

    private UserDto convertToUserDto(UserPrincipal userPrincipal) {
        UserDto userDto = new UserDto();
        userDto.setId(userPrincipal.getId());
        userDto.setName(userPrincipal.getName());
        userDto.setUsername(userPrincipal.getUsername());
        userDto.setEmail(userPrincipal.getEmail());
        userDto.setRoles(userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet()));
        return userDto;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if(authService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Username is already taken!"));
        }

        if(authService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email is already taken!"));
        }

        authService.registerUser(registerRequest);
        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }
}