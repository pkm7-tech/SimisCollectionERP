package com.simiscollection.erp.purchase.repository;

import com.simiscollection.erp.purchase.dto.PurchaseSummaryDTO;
import com.simiscollection.erp.purchase.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query("""
        SELECT new com.simiscollection.erp.purchase.dto.PurchaseSummaryDTO(
            p.id,
            p.invoiceNumber,
            p.purchaseDate,
            p.supplier.companyName,
            SUM(pi.quantity),
            p.totalAmount
        )
        FROM Purchase p
        LEFT JOIN p.purchaseItems pi
        GROUP BY
            p.id,
            p.invoiceNumber,
            p.purchaseDate,
            p.supplier.companyName,
            p.totalAmount
        ORDER BY
            p.purchaseDate DESC,
            p.id DESC
        """)
    List<PurchaseSummaryDTO> getPurchaseSummary();

    @Query("""
        SELECT
            YEAR(p.purchaseDate),
            MONTH(p.purchaseDate),
            SUM(p.totalAmount)
        FROM Purchase p
        GROUP BY
            YEAR(p.purchaseDate),
            MONTH(p.purchaseDate)
        ORDER BY
            YEAR(p.purchaseDate),
            MONTH(p.purchaseDate)
        """)
    List<Object[]> getMonthlyPurchases();
}