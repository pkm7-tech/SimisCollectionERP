package com.simiscollection.erp.inventory.service;

import com.simiscollection.erp.inventory.dto.InventoryRequest;
import com.simiscollection.erp.inventory.dto.InventoryResponse;

import java.util.List;

public interface InventoryService {

    InventoryResponse createInventory(InventoryRequest request);

    List<InventoryResponse> getAllInventories();

    InventoryResponse getInventoryById(Long id);

    InventoryResponse updateInventory(Long id, InventoryRequest request);

    void deleteInventory(Long id);
}