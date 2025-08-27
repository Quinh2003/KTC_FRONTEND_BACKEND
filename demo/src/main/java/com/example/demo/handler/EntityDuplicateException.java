package com.example.demo.handler;

import org.springframework.http.HttpStatus;

public class EntityDuplicateException extends RuntimeException {
    private final HttpStatus status;

    public EntityDuplicateException(String message) {
        super(message);
        this.status = HttpStatus.CONFLICT;
    }

    public EntityDuplicateException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
