package com.swp490_g2.hrms.common.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor

public enum ErrorStatusConstants {
    EXISTED_EMAIL(HttpStatus.BAD_REQUEST, 400000, "Email is already exists. Try again!"),
    INVALID_VERIFICATION_CODE(HttpStatus.BAD_REQUEST, 400001, "Invalid verification code."),
    NOT_EXISTED_USER_ID(HttpStatus.BAD_REQUEST, 400003, "The user does not exist.")
    ;

    private final HttpStatus errorStatus;

    private final Integer errorCode;

    private final String message;

}
