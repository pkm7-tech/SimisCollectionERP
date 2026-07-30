package com.simiscollection.erp.supplier.service;

import com.simiscollection.erp.supplier.dto.SupplierRequest;
import com.simiscollection.erp.supplier.dto.SupplierResponse;

import java.util.List;

public interface SupplierService {

    SupplierResponse createSupplier(SupplierRequest request);

    List<SupplierResponse> getAllSuppliers();

    SupplierResponse getSupplierById(Long id);

    SupplierResponse updateSupplier(Long id, SupplierRequest request);

    void deleteSupplier(Long id);
}