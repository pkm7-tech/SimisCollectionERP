package com.simiscollection.erp.sale.mapper;

import com.simiscollection.erp.sale.dto.SaleItemResponse;
import com.simiscollection.erp.sale.dto.SaleResponse;
import com.simiscollection.erp.sale.entity.Sale;
import com.simiscollection.erp.sale.entity.SaleItem;

import java.util.stream.Collectors;

public class SaleMapper {

    public static SaleItemResponse toSaleItemResponse(SaleItem saleItem) {

        SaleItemResponse response = new SaleItemResponse();

        response.setProductId(saleItem.getProduct().getId());
        response.setProductName(saleItem.getProduct().getName());
        response.setQuantity(saleItem.getQuantity());
        response.setUnitPrice(saleItem.getUnitPrice());
        response.setSubtotal(saleItem.getSubtotal());

        return response;
    }

    public static SaleResponse toResponse(Sale sale) {

        SaleResponse response = new SaleResponse();

        response.setId(sale.getId());
        response.setInvoiceNumber(sale.getInvoiceNumber());
        response.setSaleDate(sale.getSaleDate());
        response.setTotalAmount(sale.getTotalAmount());

        response.setCustomerId(sale.getCustomer().getId());
        response.setCustomerName(
                sale.getCustomer().getFirstName() + " " +
                        sale.getCustomer().getLastName()
        );

        response.setItems(
                sale.getSaleItems()
                        .stream()
                        .map(SaleMapper::toSaleItemResponse)
                        .collect(Collectors.toList())
        );

        return response;
    }

    private SaleMapper() {
    }
}