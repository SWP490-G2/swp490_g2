package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "notification")
@AttributeOverride(name = "id", column = @Column(name = "notificationId"))
public class Notification extends BaseEntity {
    @Column(nullable = false)
    private String message;

    @Column
    private Long userId;

    @Column
    private String url;
}
