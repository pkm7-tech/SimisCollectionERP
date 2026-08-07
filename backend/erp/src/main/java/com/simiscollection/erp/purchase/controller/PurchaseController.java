package com.simiscollection.erp.purchase.controller;

import com.simiscollection.erp.purchase.dto.PurchaseRequest;
import com.simiscollection.erp.purchase.dto.PurchaseResponse;
import com.simiscollection.erp.purchase.service.PurchaseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simiscollection.erp.purchase.dto.PurchaseSummaryDTO;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public ResponseEntity<PurchaseResponse> createPurchase(
            @Valid @RequestBody PurchaseRequest request) {

        PurchaseResponse response = purchaseService.createPurchase(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseResponse>> getAllPurchases() {

        return ResponseEntity.ok(purchaseService.getAllPurchases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseResponse> getPurchaseById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                purchaseService.getPurchaseById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePurchase(
            @PathVariable Long id) {

        purchaseService.deletePurchase(id);

        return ResponseEntity.ok("Purchase deleted successfully.");
    }
    @GetMapping("/history")
    public ResponseEntity<List<PurchaseSummaryDTO>> getPurchaseHistory() {

        return ResponseEntity.ok(
                purchaseService.getPurchaseSummary()
        );

    }
}