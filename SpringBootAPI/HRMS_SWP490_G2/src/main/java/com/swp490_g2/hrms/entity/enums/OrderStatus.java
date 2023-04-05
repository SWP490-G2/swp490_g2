package com.swp490_g2.hrms.entity.enums;


/**
 *  PENDING  -> ACCEPTED -> DELIVERING   -> COMPLETED
 *           |                           |
 *           -> REJECTED                 -> ABORTED
 *
 */
public enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    DELIVERING,
    ABORTED,
    COMPLETED
}

