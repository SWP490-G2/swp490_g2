package com.swp490_g2.hrms.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportIncomeOverTime {
    private String label;
    private Long totalOrders;
    private Double totalSales;
}
