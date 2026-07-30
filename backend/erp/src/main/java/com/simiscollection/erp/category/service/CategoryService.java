package com.simiscollection.erp.category.service;

import com.simiscollection.erp.category.dto.CategoryRequest;
import com.simiscollection.erp.category.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse save(CategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);

}