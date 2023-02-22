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
@Table(name = "user")
@AttributeOverride(name = "id", column = @Column(name = "userId"))
public class User extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
//
//    @Column(name = "first_name", nullable = false)
//    private String firstName;
//
//    @Column(name = "middle_name", nullable = true)
//    private String middleName;
//
//    @Column(name = "last_name", nullable = false)
//    private String lastName;

//    @Column(name = "date_of_birth", nullable = false)
//    private Date dateOfBirth;

//    @Column(name = "gender", nullable = false)
//    private Boolean gender;

//    @Column(name = "phone_number", nullable = false)
//    private String phoneNumber;

    @Column(nullable = false, columnDefinition="tinyint(1) default 1")
    private Boolean isActive;

//    @Column(name = "is_banned")
//    private Boolean isBanned;

//    @Column(name = "avatar")
//    private String avatar; implement later

//    @Column(name = "citizen_identification")
//    private String citizenIdentification;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "address_id", nullable = false)
//    private Address address;
}
