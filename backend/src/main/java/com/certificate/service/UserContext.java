package com.certificate.service;

import org.springframework.stereotype.Component;

@Component
public class UserContext {
    
    public String getCurrentUserId() {
        return "system";
    }
}