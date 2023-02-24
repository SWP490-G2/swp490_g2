package com.swp490_g2.hrms.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor

public enum ErrorStatusConstants {
    EXISTED_EMAIL(HttpStatus.BAD_REQUEST, 400002, "Email is already exists. Try again!");

    private final HttpStatus errorStatus;

    private final Integer errorCode;

    private final String message;

}
