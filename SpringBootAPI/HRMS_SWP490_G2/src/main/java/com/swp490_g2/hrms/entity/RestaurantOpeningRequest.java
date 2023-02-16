package com.swp490_g2.hrms.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "restaurant_opening_request")
@AttributeOverride(name = "id", column = @Column(name = "opening_request_id"))
public class RestaurantOpeningRequest extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "restaurant_name")
    private String restaurantName;

    @Column(name = "description")
    private String description;

    @Column(name = "note")
    private String note;

    @Column(name = "admin_message")
    private String adminMessage;

    @Column(name = "status")
    private Boolean status;

}
