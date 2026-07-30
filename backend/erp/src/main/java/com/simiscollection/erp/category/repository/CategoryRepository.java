package com.simiscollection.erp.category.repository;

import com.simiscollection.erp.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}