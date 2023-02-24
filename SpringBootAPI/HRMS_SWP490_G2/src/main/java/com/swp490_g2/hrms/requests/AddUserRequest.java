package com.swp490_g2.hrms.requests;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.swp490_g2.hrms.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AddUserRequest {
    private Long userId;
    private String email;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
//    private Date dateOfBirth;
//    private Boolean gender;
    private String phoneNumber;
    private Boolean isActive;
//    private Boolean isBanned;
//    private String avatar;
//    private String citizenIdentification;
//    private Address address;

}
