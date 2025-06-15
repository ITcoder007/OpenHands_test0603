package com.certificate.exception;

public class DomainOperationException extends RuntimeException {
    public DomainOperationException(String message) {
        super(message);
    }
    
    public DomainOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}