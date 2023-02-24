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
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class User extends BaseEntity {
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

//    @Column(name = "date_of_birth", nullable = false)
//    private Date dateOfBirth;

//    @Column(name = "gender", nullable = false)
//    private Boolean gender;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_active")
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
