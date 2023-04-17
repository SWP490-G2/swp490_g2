package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.Persistent;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reject_restaurant_opening_request_reason")
@AttributeOverride(name = "id", column = @Column(name = "rejectRestaurantOpeningRequestReasonId"))
public class RejectRestaurantOpeningRequestReason extends BaseEntity {
    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String reason;

    @ManyToOne
    @JoinColumn(name = "reject_restaurant_opening_request_id", nullable = false)
    @Persistent
    private RejectRestaurantOpeningRequest rejectRestaurantOpeningRequest;
}
