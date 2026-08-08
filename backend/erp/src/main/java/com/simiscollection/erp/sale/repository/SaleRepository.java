package com.simiscollection.erp.sale.repository;

import com.simiscollection.erp.sale.dto.SaleSummaryDTO;
import com.simiscollection.erp.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Query("""
        SELECT new com.simiscollection.erp.sale.dto.SaleSummaryDTO(
            s.id,
            s.invoiceNumber,
            s.saleDate,
            s.customer.firstName,
            SUM(si.quantity),
            s.totalAmount
        )
        FROM Sale s
        LEFT JOIN s.saleItems si
        GROUP BY
            s.id,
            s.invoiceNumber,
            s.saleDate,
            s.customer.firstName,
            s.totalAmount
        ORDER BY
            s.saleDate DESC,
            s.id DESC
        """)
    List<SaleSummaryDTO> getSaleSummary();

    @Query("""
        SELECT
            YEAR(s.saleDate),
            MONTH(s.saleDate),
            SUM(s.totalAmount)
        FROM Sale s
        GROUP BY
            YEAR(s.saleDate),
            MONTH(s.saleDate)
        ORDER BY
            YEAR(s.saleDate),
            MONTH(s.saleDate)
        """)
    List<Object[]> getMonthlySales();
}