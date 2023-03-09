package com.swp490_g2.hrms.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.swp490_g2.hrms.entity.Address;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class UserInformationRequest {
    private Long userId;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String firstName;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String middleName;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String lastName;

//    @Pattern(regexp = "^(0[1-9]|1\\d|2\\d|3[01])\\-(0[1-9]|1[0-2])\\-(19|20)\\d{2}$", flags = Pattern.Flag.UNICODE_CASE)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dateOfBirth;

//    private String avatar;
//    private Address address;

}
