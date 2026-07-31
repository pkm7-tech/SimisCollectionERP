package com.simiscollection.erp.sale.repository;

import com.simiscollection.erp.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}