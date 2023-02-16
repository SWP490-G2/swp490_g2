package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant")
@AttributeOverride(name = "id", column = @Column(name = "restaurant_id"))
public class Restaurant extends BaseEntity{

    @Column(name = "restaurant_name", nullable = false)
    private String restaurantName;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "cover", nullable = false)
    private String cover;

    @Column(name = "open_time", nullable = false)
    private Date openTime;

    @Column(name = "close_time", nullable = false)
    private Date closeTime;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "is_banned")
    private Boolean isBanned;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "restaurant")
    private Set<Address> addresses;

}
