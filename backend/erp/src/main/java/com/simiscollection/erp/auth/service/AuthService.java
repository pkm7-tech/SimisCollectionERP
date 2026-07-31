package com.simiscollection.erp.auth.service;

import com.simiscollection.erp.auth.dto.LoginRequest;
import com.simiscollection.erp.auth.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}