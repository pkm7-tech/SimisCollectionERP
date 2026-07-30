package com.simiscollection.erp.category.mapper;

import com.simiscollection.erp.category.dto.CategoryRequest;
import com.simiscollection.erp.category.dto.CategoryResponse;
import com.simiscollection.erp.category.entity.Category;

public class CategoryMapper {

    public static Category toEntity(CategoryRequest request) {

        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(true);

        return category;
    }

    public static CategoryResponse toResponse(Category category) {

        CategoryResponse response = new CategoryResponse();

        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setActive(category.getActive());

        return response;
    }
}