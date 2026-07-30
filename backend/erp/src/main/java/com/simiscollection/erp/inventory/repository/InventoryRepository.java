package com.simiscollection.erp.inventory.repository;

import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Optional<Inventory> findByProduct(Product product);
}