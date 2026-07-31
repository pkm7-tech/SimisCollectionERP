package com.simiscollection.erp.auth.controller;

import com.simiscollection.erp.auth.dto.LoginRequest;
import com.simiscollection.erp.auth.dto.LoginResponse;
import com.simiscollection.erp.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}