package com.swp490_g2.hrms.common.exception;

import com.google.gson.JsonObject;
import lombok.Getter;
import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;

@Getter
public class BusinessException extends RuntimeException {

    private static String GetJsonExceptionMessage(ErrorStatusConstants errorStatus, String msg) {
        JsonObject msgJson = new JsonObject();
        msgJson.addProperty("errorCode", errorStatus.getErrorCode());
        msgJson.addProperty("message", errorStatus.getMessage());
        return msgJson.toString();
    }

    public BusinessException(ErrorStatusConstants errorStatus, String msg) {
        super(GetJsonExceptionMessage(errorStatus, msg));
    }

    public BusinessException(String msg){
        super(msg);
    }

    public BusinessException(ErrorStatusConstants errorStatus) {
        super(GetJsonExceptionMessage(errorStatus, null));
    }
//
//    public BusinessException(String message, Throwable cause, ErrorStatusConstants errorStatus, String msg) {
//        super(message, cause);
//    }
//
//    public BusinessException(Throwable cause, ErrorStatusConstants errorStatus, String msg) {
//        super(cause);
//    }
//
//    public BusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, ErrorStatusConstants errorStatus, String msg) {
//        super(message, cause, enableSuppression, writableStackTrace);
//    }
}
