package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "buyer")
@Inheritance(strategy = InheritanceType.JOINED)
@AttributeOverride(name = "id", column = @Column(name = "userId"))
@PrimaryKeyJoinColumn(name = "userId")
public class Buyer extends User{

    public Buyer(String email,
                 String password,
                 String phoneNumber,
                 boolean isActive,
                 String verificationCode,
                 Role role,
                 String firstName,
                 String middleName,
                 String lastName,
                 Date dateOfBirth,
                 String avatar,
                 Address address) {
        super(email, password, phoneNumber, isActive, verificationCode, role);
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.avatar = avatar;
        this.address = address;
    }

    @Column()
    private String firstName;

    @Column()
    private String middleName;

    @Column()
    private String lastName;

    @Column()
    private Date dateOfBirth;

    @Column()
    private String avatar;

    @OneToOne
    @JoinColumn(name = "addressId", referencedColumnName = "addressId")
    private Address address;

}
