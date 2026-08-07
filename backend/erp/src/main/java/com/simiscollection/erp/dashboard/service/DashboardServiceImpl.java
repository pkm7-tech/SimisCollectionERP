package com.simiscollection.erp.dashboard.service;

import com.simiscollection.erp.category.repository.CategoryRepository;
import com.simiscollection.erp.customer.repository.CustomerRepository;
import com.simiscollection.erp.dashboard.dto.DashboardSummaryResponse;
import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.inventory.repository.InventoryRepository;
import com.simiscollection.erp.product.repository.ProductRepository;
import com.simiscollection.erp.purchase.repository.PurchaseRepository;
import com.simiscollection.erp.sale.entity.Sale;
import com.simiscollection.erp.sale.repository.SaleRepository;
import com.simiscollection.erp.supplier.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final PurchaseRepository purchaseRepository;
    private final SaleRepository saleRepository;
    private final InventoryRepository inventoryRepository;

    public DashboardServiceImpl(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            SupplierRepository supplierRepository,
            PurchaseRepository purchaseRepository,
            SaleRepository saleRepository,
            InventoryRepository inventoryRepository) {

        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.purchaseRepository = purchaseRepository;
        this.saleRepository = saleRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public DashboardSummaryResponse getDashboardSummary() {

        DashboardSummaryResponse response = new DashboardSummaryResponse();

        response.setTotalCategories(categoryRepository.count());
        response.setTotalProducts(productRepository.count());
        response.setTotalCustomers(customerRepository.count());
        response.setTotalSuppliers(supplierRepository.count());
        response.setTotalPurchases(purchaseRepository.count());
        response.setTotalSales(saleRepository.count());

        response.setInventoryItems(inventoryRepository.count());
        BigDecimal totalRevenue = saleRepository.findAll()
                .stream()
                .map(Sale::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        response.setTotalRevenue(totalRevenue);

        BigDecimal inventoryValue = inventoryRepository.findAll()
                .stream()
                .map(item ->
                        item.getAveragePurchasePrice()
                                .multiply(
                                        BigDecimal.valueOf(item.getQuantity())
                                )
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        response.setInventoryValue(inventoryValue);

        long totalQuantity = inventoryRepository.findAll()
                .stream()
                .mapToLong(Inventory::getQuantity)
                .sum();

        response.setTotalInventoryQuantity(totalQuantity);

        return response;
    }
}