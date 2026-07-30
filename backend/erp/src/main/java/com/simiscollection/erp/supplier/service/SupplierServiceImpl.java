package com.simiscollection.erp.supplier.service;

import com.simiscollection.erp.supplier.dto.SupplierRequest;
import com.simiscollection.erp.supplier.dto.SupplierResponse;
import com.simiscollection.erp.supplier.entity.Supplier;
import com.simiscollection.erp.supplier.exception.SupplierNotFoundException;
import com.simiscollection.erp.supplier.mapper.SupplierMapper;
import com.simiscollection.erp.supplier.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public SupplierResponse createSupplier(SupplierRequest request) {

        Supplier supplier = SupplierMapper.toEntity(request);

        Supplier savedSupplier = supplierRepository.save(supplier);

        return SupplierMapper.toResponse(savedSupplier);
    }

    @Override
    public List<SupplierResponse> getAllSuppliers() {

        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::toResponse)
                .toList();
    }

    @Override
    public SupplierResponse getSupplierById(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new SupplierNotFoundException(
                                "Supplier not found with id " + id
                        ));

        return SupplierMapper.toResponse(supplier);
    }

    @Override
    public SupplierResponse updateSupplier(Long id, SupplierRequest request) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new SupplierNotFoundException(
                                "Supplier not found with id " + id
                        ));

        supplier.setCompanyName(request.getCompanyName());
        supplier.setContactPerson(request.getContactPerson());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());

        Supplier updatedSupplier = supplierRepository.save(supplier);

        return SupplierMapper.toResponse(updatedSupplier);
    }

    @Override
    public void deleteSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new SupplierNotFoundException(
                                "Supplier not found with id " + id
                        ));

        supplierRepository.delete(supplier);
    }
}