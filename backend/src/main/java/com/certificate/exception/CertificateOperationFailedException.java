package com.certificate.exception;

public class CertificateOperationFailedException extends RuntimeException {
    public CertificateOperationFailedException(String message) {
        super(message);
    }
    
    public CertificateOperationFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}