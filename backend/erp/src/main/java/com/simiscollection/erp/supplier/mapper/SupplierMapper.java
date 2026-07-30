package com.simiscollection.erp.supplier.mapper;

import com.simiscollection.erp.supplier.dto.SupplierRequest;
import com.simiscollection.erp.supplier.dto.SupplierResponse;
import com.simiscollection.erp.supplier.entity.Supplier;

public class SupplierMapper {

    public static Supplier toEntity(SupplierRequest request) {

        Supplier supplier = new Supplier();

        supplier.setCompanyName(request.getCompanyName());
        supplier.setContactPerson(request.getContactPerson());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        supplier.setActive(true);

        return supplier;
    }

    public static SupplierResponse toResponse(Supplier supplier) {

        SupplierResponse response = new SupplierResponse();

        response.setId(supplier.getId());
        response.setCompanyName(supplier.getCompanyName());
        response.setContactPerson(supplier.getContactPerson());
        response.setEmail(supplier.getEmail());
        response.setPhone(supplier.getPhone());
        response.setAddress(supplier.getAddress());
        response.setActive(supplier.isActive());

        return response;
    }
}