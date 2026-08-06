package com.simiscollection.erp.category.service;

import com.simiscollection.erp.category.dto.CategoryRequest;
import com.simiscollection.erp.category.dto.CategoryResponse;
import com.simiscollection.erp.category.entity.Category;
import com.simiscollection.erp.category.exception.CategoryNotFoundException;
import com.simiscollection.erp.category.mapper.CategoryMapper;
import com.simiscollection.erp.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponse save(CategoryRequest request) {

        Category category = CategoryMapper.toEntity(request);

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(savedCategory);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found with id " + id
                        ));

        return CategoryMapper.toResponse(category);
    }
    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found with id " + id
                        ));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updatedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(updatedCategory);
    }


    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found with id " + id
                        ));

        try {

            categoryRepository.delete(category);

        } catch (DataIntegrityViolationException ex) {

            throw new DataIntegrityViolationException(
                    "Cannot delete category because it is assigned to one or more products."
            );

        }

    }
}