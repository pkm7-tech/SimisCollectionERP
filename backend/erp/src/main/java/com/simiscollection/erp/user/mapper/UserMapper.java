package com.simiscollection.erp.user.mapper;

import com.simiscollection.erp.user.dto.UserResponse;
import com.simiscollection.erp.user.entity.User;

public class UserMapper {

    public static UserResponse toResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        response.setActive(user.isActive());

        return response;
    }

    private UserMapper() {
    }
}