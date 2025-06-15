package com.certificate.exception;

public class DomainNotFoundException extends RuntimeException {
    public DomainNotFoundException(String id) {
        super("Domain not found with id: " + id);
    }
    
    public DomainNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}