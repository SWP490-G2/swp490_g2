package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.swp490_g2.hrms.common.utils.DateUtils;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant")
@AttributeOverride(name = "id", column = @Column(name = "restaurantId"))
public class Restaurant extends BaseEntity {

    @Column(nullable = false)
    private String restaurantName;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(unique = true)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private File avatarFile;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @Transient
    private Set<Product> products;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Address address;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(name = "restaurant__restaurant_category",
            joinColumns = @JoinColumn(name = "restaurantId"), inverseJoinColumns = @JoinColumn(name = "restaurantCategoryId"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<RestaurantCategory> restaurantCategories;

    @Column
    private String openTime;

    @Column
    private String closedTime;

    public boolean isOpening() {
        if (openTime == null || closedTime == null) {
            return false;
        }

        LocalTime now = LocalTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        return Objects.requireNonNull(DateUtils.toLocalTime(openTime)).isBefore(now)
                && now.isBefore(DateUtils.toLocalTime(closedTime));
    }
}
