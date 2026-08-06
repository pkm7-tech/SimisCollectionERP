package com.simiscollection.erp.inventory.dto;

import java.math.BigDecimal;

public class ProductStockResponse {

    private Long productId;

    private String productName;

    private BigDecimal averagePurchasePrice;

    private Integer currentStock;

    public ProductStockResponse() {
    }

    public ProductStockResponse(
            Long productId,
            String productName,
            BigDecimal averagePurchasePrice,
            Integer currentStock) {

        this.productId = productId;
        this.productName = productName;
        this.averagePurchasePrice = averagePurchasePrice;
        this.currentStock = currentStock;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getAveragePurchasePrice() {
        return averagePurchasePrice;
    }

    public void setAveragePurchasePrice(BigDecimal averagePurchasePrice) {
        this.averagePurchasePrice = averagePurchasePrice;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

}