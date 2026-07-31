package com.simiscollection.erp.sale.repository;

import com.simiscollection.erp.sale.entity.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
}