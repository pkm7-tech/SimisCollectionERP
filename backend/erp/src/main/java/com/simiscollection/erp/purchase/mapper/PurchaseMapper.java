package com.simiscollection.erp.purchase.mapper;

import com.simiscollection.erp.purchase.dto.PurchaseItemResponse;
import com.simiscollection.erp.purchase.dto.PurchaseResponse;
import com.simiscollection.erp.purchase.entity.Purchase;
import com.simiscollection.erp.purchase.entity.PurchaseItem;

import java.util.List;

public class PurchaseMapper {

    public static PurchaseItemResponse toItemResponse(PurchaseItem item) {

        PurchaseItemResponse response = new PurchaseItemResponse();

        response.setId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setQuantity(item.getQuantity());
        response.setUnitPrice(item.getUnitPrice());
        response.setSubtotal(item.getSubtotal());

        return response;
    }

    public static PurchaseResponse toResponse(Purchase purchase) {

        PurchaseResponse response = new PurchaseResponse();

        response.setId(purchase.getId());
        response.setInvoiceNumber(purchase.getInvoiceNumber());
        response.setPurchaseDate(purchase.getPurchaseDate());

        response.setSupplierId(purchase.getSupplier().getId());
        response.setSupplierName(purchase.getSupplier().getCompanyName());

        response.setTotalAmount(purchase.getTotalAmount());

        List<PurchaseItemResponse> items =
                purchase.getPurchaseItems()
                        .stream()
                        .map(PurchaseMapper::toItemResponse)
                        .toList();

        response.setItems(items);

        return response;
    }
}