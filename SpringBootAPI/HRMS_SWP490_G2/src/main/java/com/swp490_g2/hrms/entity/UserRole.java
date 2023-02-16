package com.swp490_g2.hrms.entity;

import com.swp490_g2.hrms.entity.id.UserRoleId;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_role")
public class UserRole implements Serializable {
    @EmbeddedId
    private UserRoleId userRoleId;

}
