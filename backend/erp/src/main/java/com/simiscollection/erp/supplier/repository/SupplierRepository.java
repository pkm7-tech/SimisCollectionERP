package com.simiscollection.erp.supplier.repository;

import com.simiscollection.erp.supplier.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}