package com.simiscollection.erp.sale.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class SaleSummaryDTO {

    private Long id;

    private String invoiceNumber;

    private LocalDate saleDate;

    private String customerName;

    private Long totalItems;

    private BigDecimal totalAmount;
}