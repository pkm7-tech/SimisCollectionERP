package com.simiscollection.erp.customer.repository;

import com.simiscollection.erp.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}