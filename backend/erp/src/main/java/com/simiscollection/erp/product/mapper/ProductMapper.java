package com.simiscollection.erp.product.mapper;

import com.simiscollection.erp.product.dto.ProductResponse;
import com.simiscollection.erp.product.entity.Product;

public class ProductMapper {

    public static ProductResponse toResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());

        response.setActive(product.getActive());

        response.setCategoryId(product.getCategory().getId());
        response.setCategoryName(product.getCategory().getName());

        return response;
    }
}