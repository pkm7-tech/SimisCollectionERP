package com.simiscollection.erp.sale.service;

import com.simiscollection.erp.customer.entity.Customer;
import com.simiscollection.erp.customer.repository.CustomerRepository;
import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.inventory.repository.InventoryRepository;
import com.simiscollection.erp.product.entity.Product;
import com.simiscollection.erp.product.repository.ProductRepository;
import com.simiscollection.erp.sale.dto.SaleItemRequest;
import com.simiscollection.erp.sale.dto.SaleRequest;
import com.simiscollection.erp.sale.dto.SaleResponse;
import com.simiscollection.erp.sale.entity.Sale;
import com.simiscollection.erp.sale.entity.SaleItem;
import com.simiscollection.erp.sale.exception.InsufficientStockException;
import com.simiscollection.erp.sale.exception.SaleNotFoundException;
import com.simiscollection.erp.sale.mapper.SaleMapper;
import com.simiscollection.erp.sale.repository.SaleRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.simiscollection.erp.sale.dto.SaleSummaryDTO;
import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public SaleServiceImpl(
            SaleRepository saleRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            InventoryRepository inventoryRepository
    ) {
        this.saleRepository = saleRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public SaleResponse createSale(SaleRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Sale sale = new Sale();
        sale.setInvoiceNumber(request.getInvoiceNumber());
        sale.setSaleDate(request.getSaleDate());
        sale.setCustomer(customer);

        BigDecimal total = BigDecimal.ZERO;

        for (SaleItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            Inventory inventory = inventoryRepository.findByProduct(product)
                    .orElseThrow(() -> new RuntimeException("Inventory not found"));

            if (inventory.getQuantity() < itemRequest.getQuantity()) {
                throw new InsufficientStockException(
                        "Insufficient stock for product: " + product.getName()
                );
            }

            inventory.setQuantity(
                    inventory.getQuantity() - itemRequest.getQuantity()
            );

            BigDecimal subtotal = itemRequest.getUnitPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(itemRequest.getQuantity());
            saleItem.setUnitPrice(itemRequest.getUnitPrice());
            saleItem.setSubtotal(subtotal);

            sale.getSaleItems().add(saleItem);

            total = total.add(subtotal);
        }

        sale.setTotalAmount(total);

        Sale savedSale = saleRepository.save(sale);

        return SaleMapper.toResponse(savedSale);
    }

    @Override
    public List<SaleResponse> getAllSales() {
        return saleRepository.findAll()
                .stream()
                .map(SaleMapper::toResponse)
                .toList();
    }

    @Override
    public List<SaleSummaryDTO> getSaleSummary() {

        return saleRepository.getSaleSummary();

    }

    @Override
    public SaleResponse getSaleById(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() ->
                        new SaleNotFoundException("Sale not found with id: " + id));

        return SaleMapper.toResponse(sale);
    }

    @Override
    public void deleteSale(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() ->
                        new SaleNotFoundException("Sale not found with id: " + id));

        saleRepository.delete(sale);
    }
}