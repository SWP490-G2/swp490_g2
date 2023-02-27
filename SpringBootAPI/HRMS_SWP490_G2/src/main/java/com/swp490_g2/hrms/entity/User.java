package com.swp490_g2.hrms.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "user")
@AttributeOverride(name = "id", column = @Column(name = "userId"))
public class User extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name", nullable = true)
    private String firstName;

    @Column(name = "middle_name", nullable = true)
    private String middleName;

    @Column(name = "last_name", nullable = true)
    private String lastName;
//
//    @Column(name = "date_of_birth", nullable = false)
//    private Date dateOfBirth;
//
//    @Column(name = "gender", nullable = false)
//    private Boolean gender;

    @Column(name = "phone_number", nullable = true)
    private String phoneNumber;

    @Column(name = "avatar", nullable = true)
    private String avatar;

    @Column(nullable = false, columnDefinition="tinyint(1) default 1", insertable = false)
    private boolean isActive;

    @Column(columnDefinition = "NVARCHAR(6)")
    private String verificationCode;
//
//    @Column(name = "is_banned")
//    private Boolean isBanned;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "address_id", nullable = false)
//    private Address address;
}
