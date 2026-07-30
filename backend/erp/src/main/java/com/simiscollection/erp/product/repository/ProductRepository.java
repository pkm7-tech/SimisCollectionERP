package com.simiscollection.erp.product.repository;

import com.simiscollection.erp.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}