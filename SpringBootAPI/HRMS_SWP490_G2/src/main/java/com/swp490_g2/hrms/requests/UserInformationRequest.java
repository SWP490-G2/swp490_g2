package com.swp490_g2.hrms.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.LowerCamelCaseStrategy.class)
public class UserInformationRequest {
    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String firstName;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String middleName;

    @Pattern(regexp = "^[A-Za-z ]{1,32}$", flags = Pattern.Flag.UNICODE_CASE)
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Instant dateOfBirth;

    private Long wardId;

    private String specificAddress;

}
