package com.simiscollection.erp.sale.service;

import com.simiscollection.erp.sale.dto.SaleRequest;
import com.simiscollection.erp.sale.dto.SaleResponse;
import com.simiscollection.erp.sale.dto.SaleSummaryDTO;

import java.util.List;

public interface SaleService {

    SaleResponse createSale(SaleRequest request);

    List<SaleResponse> getAllSales();

    List<SaleSummaryDTO> getSaleSummary();

    SaleResponse getSaleById(Long id);

    void deleteSale(Long id);
}