package com.simiscollection.erp.inventory.service;

import com.simiscollection.erp.inventory.dto.InventoryRequest;
import com.simiscollection.erp.inventory.dto.InventoryResponse;
import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.inventory.exception.InventoryAlreadyExistsException;
import com.simiscollection.erp.inventory.exception.InventoryNotFoundException;
import com.simiscollection.erp.inventory.mapper.InventoryMapper;
import com.simiscollection.erp.inventory.repository.InventoryRepository;
import com.simiscollection.erp.product.entity.Product;
import com.simiscollection.erp.product.exception.ProductNotFoundException;
import com.simiscollection.erp.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository,
                                ProductRepository productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public InventoryResponse createInventory(InventoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id " + request.getProductId()
                        ));

        inventoryRepository.findByProduct(product)
                .ifPresent(i -> {
                    throw new InventoryAlreadyExistsException(
                            "Inventory already exists for product id " + product.getId()
                    );
                });

        Inventory inventory = InventoryMapper.toEntity(request, product);

        Inventory savedInventory = inventoryRepository.save(inventory);

        return InventoryMapper.toResponse(savedInventory);
    }

    @Override
    public List<InventoryResponse> getAllInventories() {

        return inventoryRepository.findAll()
                .stream()
                .map(InventoryMapper::toResponse)
                .toList();
    }

    @Override
    public InventoryResponse getInventoryById(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id " + id
                        ));

        return InventoryMapper.toResponse(inventory);
    }

    @Override
    public InventoryResponse updateInventory(Long id, InventoryRequest request) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id " + id
                        ));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with id " + request.getProductId()
                        ));

        inventory.setProduct(product);
        inventory.setQuantity(request.getQuantity());
        inventory.setReorderLevel(request.getReorderLevel());

        Inventory updatedInventory = inventoryRepository.save(inventory);

        return InventoryMapper.toResponse(updatedInventory);
    }

    @Override
    public void deleteInventory(Long id) {

        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() ->
                        new InventoryNotFoundException(
                                "Inventory not found with id " + id
                        ));

        inventoryRepository.delete(inventory);
    }
}