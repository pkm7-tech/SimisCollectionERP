package com.simiscollection.erp.common.exception;

import com.simiscollection.erp.category.exception.CategoryNotFoundException;
import com.simiscollection.erp.inventory.exception.InventoryAlreadyExistsException;
import com.simiscollection.erp.inventory.exception.InventoryNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, Object> handleValidationException(MethodArgumentNotValidException ex) {

        System.out.println("GlobalExceptionHandler executed");

        Map<String, String> errors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        Map<String, Object> response = new HashMap<>();

        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("message", "Validation Failed");
        response.put("errors", errors);

        return response;
    }
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(CategoryNotFoundException.class)
    public Map<String, Object> handleCategoryNotFoundException(CategoryNotFoundException ex) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", 404);
        response.put("message", ex.getMessage());

        return response;
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleGeneralException(Exception ex) {

        ex.printStackTrace();

        Map<String, Object> response = new HashMap<>();

        response.put("status", 500);
        response.put("message", ex.getMessage());

        return response;
    }

    @ExceptionHandler(InventoryNotFoundException.class)
    public ResponseEntity<String> handleInventoryNotFoundException(
            InventoryNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(InventoryAlreadyExistsException.class)
    public ResponseEntity<String> handleInventoryAlreadyExistsException(
            InventoryAlreadyExistsException ex) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }
}