package com.simiscollection.erp.customer.mapper;

import com.simiscollection.erp.customer.dto.CustomerRequest;
import com.simiscollection.erp.customer.dto.CustomerResponse;
import com.simiscollection.erp.customer.entity.Customer;

public class CustomerMapper {

    public static Customer toEntity(CustomerRequest request) {

        Customer customer = new Customer();

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        // Every new customer is active by default
        customer.setActive(true);

        return customer;
    }

    public static CustomerResponse toResponse(Customer customer) {

        CustomerResponse response = new CustomerResponse();

        response.setId(customer.getId());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());
        response.setActive(customer.isActive());

        return response;
    }
}