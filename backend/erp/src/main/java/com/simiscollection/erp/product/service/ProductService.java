package com.simiscollection.erp.product.service;

import com.simiscollection.erp.product.dto.ProductRequest;
import com.simiscollection.erp.product.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse save(ProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);
}