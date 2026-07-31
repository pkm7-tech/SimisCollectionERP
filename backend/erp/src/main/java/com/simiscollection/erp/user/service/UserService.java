package com.simiscollection.erp.user.service;

import com.simiscollection.erp.user.dto.UserRequest;
import com.simiscollection.erp.user.dto.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    void deleteUser(Long id);
}