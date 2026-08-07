package com.simiscollection.erp.purchase.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PurchaseSummaryDTO {

    private Long id;
    private String invoiceNumber;
    private LocalDate purchaseDate;
    private String supplierName;
    private Long totalItems;
    private BigDecimal totalAmount;

    public PurchaseSummaryDTO() {
    }

    public PurchaseSummaryDTO(
            Long id,
            String invoiceNumber,
            LocalDate purchaseDate,
            String supplierName,
            Long totalItems,
            BigDecimal totalAmount) {

        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.purchaseDate = purchaseDate;
        this.supplierName = supplierName;
        this.totalItems = totalItems;
        this.totalAmount = totalAmount;
    }

    public Long getId() {
        return id;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public Long getTotalItems() {
        return totalItems;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public void setTotalItems(Long totalItems) {
        this.totalItems = totalItems;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}