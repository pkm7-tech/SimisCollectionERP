package com.simiscollection.erp.purchase.repository;

import com.simiscollection.erp.purchase.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

}