package com.simiscollection.erp.inventory.exception;

public class InventoryAlreadyExistsException extends RuntimeException {

    public InventoryAlreadyExistsException(String message) {
        super(message);
    }
}