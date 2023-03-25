package com.swp490_g2.hrms.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.swp490_g2.hrms.entity.File;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class UserInformationRequest {
    private String firstName;
    private String middleName;
    private String lastName;
    private String dateOfBirth;
    private Long wardId;
    private String specificAddress;
    private Double addressLat;
    private Double addressLng;
    private Long addressId;
    private File avatarFile;
}
