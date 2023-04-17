package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reject_restaurant_opening_request")
@AttributeOverride(name = "id", column = @Column(name = "rejectRestaurantOpeningRequestId"))
public class RejectRestaurantOpeningRequest extends BaseEntity{
    @ManyToOne(optional = false)
    private Restaurant restaurant;

    @ManyToOne(optional = false)
    private User requester;

    @OneToMany(mappedBy = "rejectRestaurantOpeningRequest")
    private List<RejectRestaurantOpeningRequestReason> reasons = new ArrayList<>();
}
