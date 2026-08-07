package com.simiscollection.erp.purchase.service;

import com.simiscollection.erp.purchase.dto.PurchaseResponse;
import com.simiscollection.erp.purchase.dto.PurchaseRequest;
import com.simiscollection.erp.purchase.dto.PurchaseSummaryDTO;
import java.util.List;

public interface PurchaseService {

    PurchaseResponse createPurchase(PurchaseRequest request);

    List<PurchaseResponse> getAllPurchases();

    PurchaseResponse getPurchaseById(Long id);

    void deletePurchase(Long id);
    List<PurchaseSummaryDTO> getPurchaseSummary();
}