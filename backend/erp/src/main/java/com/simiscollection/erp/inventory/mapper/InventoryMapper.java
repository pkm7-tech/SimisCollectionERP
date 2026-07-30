package com.simiscollection.erp.inventory.mapper;

import com.simiscollection.erp.inventory.dto.InventoryRequest;
import com.simiscollection.erp.inventory.dto.InventoryResponse;
import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.product.entity.Product;

public class InventoryMapper {

    public static Inventory toEntity(InventoryRequest request, Product product) {

        Inventory inventory = new Inventory();

        inventory.setProduct(product);
        inventory.setQuantity(request.getQuantity());
        inventory.setReorderLevel(request.getReorderLevel());

        return inventory;
    }

    public static InventoryResponse toResponse(Inventory inventory) {

        InventoryResponse response = new InventoryResponse();

        response.setId(inventory.getId());
        response.setProductId(inventory.getProduct().getId());
        response.setProductName(inventory.getProduct().getName());
        response.setQuantity(inventory.getQuantity());
        response.setReorderLevel(inventory.getReorderLevel());

        return response;
    }
}