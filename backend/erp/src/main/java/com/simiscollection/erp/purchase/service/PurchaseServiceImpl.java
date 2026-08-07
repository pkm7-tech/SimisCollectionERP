package com.simiscollection.erp.purchase.service;

import com.simiscollection.erp.inventory.entity.Inventory;
import com.simiscollection.erp.inventory.exception.InventoryNotFoundException;
import com.simiscollection.erp.inventory.repository.InventoryRepository;
import com.simiscollection.erp.product.entity.Product;
import com.simiscollection.erp.product.exception.ProductNotFoundException;
import com.simiscollection.erp.product.repository.ProductRepository;
import com.simiscollection.erp.purchase.dto.PurchaseItemRequest;
import com.simiscollection.erp.purchase.dto.PurchaseRequest;
import com.simiscollection.erp.purchase.dto.PurchaseResponse;
import com.simiscollection.erp.purchase.entity.Purchase;
import com.simiscollection.erp.purchase.entity.PurchaseItem;
import com.simiscollection.erp.purchase.exception.PurchaseNotFoundException;
import com.simiscollection.erp.purchase.mapper.PurchaseMapper;
import com.simiscollection.erp.purchase.repository.PurchaseRepository;
import com.simiscollection.erp.supplier.entity.Supplier;
import com.simiscollection.erp.supplier.exception.SupplierNotFoundException;
import com.simiscollection.erp.supplier.repository.SupplierRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.simiscollection.erp.purchase.dto.PurchaseSummaryDTO;
import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public PurchaseServiceImpl(
            PurchaseRepository purchaseRepository,
            SupplierRepository supplierRepository,
            ProductRepository productRepository,
            InventoryRepository inventoryRepository) {

        this.purchaseRepository = purchaseRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public PurchaseResponse createPurchase(PurchaseRequest request) {

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() ->
                        new SupplierNotFoundException(
                                "Supplier not found with id " + request.getSupplierId()));

        Purchase purchase = new Purchase();
        purchase.setInvoiceNumber(request.getInvoiceNumber());
        purchase.setPurchaseDate(request.getPurchaseDate());
        purchase.setSupplier(supplier);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PurchaseItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new ProductNotFoundException(
                                    "Product not found with id " + itemRequest.getProductId()));

            BigDecimal subtotal = itemRequest.getUnitPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            PurchaseItem purchaseItem = new PurchaseItem();
            purchaseItem.setPurchase(purchase);
            purchaseItem.setProduct(product);
            purchaseItem.setQuantity(itemRequest.getQuantity());
            purchaseItem.setUnitPrice(itemRequest.getUnitPrice());
            purchaseItem.setSubtotal(subtotal);

            purchase.getPurchaseItems().add(purchaseItem);

            Inventory inventory = inventoryRepository.findByProduct(product)
                    .orElseThrow(() ->
                            new InventoryNotFoundException(
                                    "Inventory not found for product id " + product.getId()));

            int oldQuantity = inventory.getQuantity();

            BigDecimal oldAveragePrice = inventory.getAveragePurchasePrice();

            int purchasedQuantity = itemRequest.getQuantity();

            BigDecimal purchasePrice = itemRequest.getUnitPrice();

            int newQuantity = oldQuantity + purchasedQuantity;

            BigDecimal totalOldCost =
                    oldAveragePrice.multiply(
                            BigDecimal.valueOf(oldQuantity));

            BigDecimal totalNewCost =
                    purchasePrice.multiply(
                            BigDecimal.valueOf(purchasedQuantity));

            BigDecimal newAveragePrice =
                    totalOldCost
                            .add(totalNewCost)
                            .divide(
                                    BigDecimal.valueOf(newQuantity),
                                    2,
                                    java.math.RoundingMode.HALF_UP
                            );

            inventory.setQuantity(newQuantity);

            inventory.setAveragePurchasePrice(newAveragePrice);

            inventoryRepository.save(inventory);

            totalAmount = totalAmount.add(subtotal);
        }

        purchase.setTotalAmount(totalAmount);

        Purchase savedPurchase = purchaseRepository.save(purchase);

        return PurchaseMapper.toResponse(savedPurchase);
    }

    @Override
    public List<PurchaseResponse> getAllPurchases() {

        return purchaseRepository.findAll()
                .stream()
                .map(PurchaseMapper::toResponse)
                .toList();
    }

    @Override
    public PurchaseResponse getPurchaseById(Long id) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new PurchaseNotFoundException(
                                "Purchase not found with id " + id));

        return PurchaseMapper.toResponse(purchase);
    }

    @Override
    public void deletePurchase(Long id) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new PurchaseNotFoundException(
                                "Purchase not found with id " + id));

        purchaseRepository.delete(purchase);
    }

    @Override
    public List<PurchaseSummaryDTO> getPurchaseSummary() {

        return purchaseRepository.getPurchaseSummary();

    }
}