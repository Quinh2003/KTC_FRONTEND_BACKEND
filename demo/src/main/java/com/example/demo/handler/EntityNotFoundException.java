package com.example.demo.handler;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends RuntimeException {
    private final HttpStatus status;

    public EntityNotFoundException(String message) {
        super(message);
        this.status = HttpStatus.NOT_FOUND;
    }

    public EntityNotFoundException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
