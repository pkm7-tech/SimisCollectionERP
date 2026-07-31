package com.simiscollection.erp.sale.service;

import com.simiscollection.erp.sale.dto.SaleRequest;
import com.simiscollection.erp.sale.dto.SaleResponse;

import java.util.List;

public interface SaleService {

    SaleResponse createSale(SaleRequest request);

    List<SaleResponse> getAllSales();

    SaleResponse getSaleById(Long id);

    void deleteSale(Long id);
}