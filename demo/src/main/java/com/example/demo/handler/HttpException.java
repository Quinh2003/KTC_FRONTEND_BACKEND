package com.example.demo.handler;

import org.springframework.http.HttpStatus;

public class HttpException extends RuntimeException {
    private final HttpStatus status;

    public HttpException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
