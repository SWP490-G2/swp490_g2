package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "admin")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class Admin extends User{


}
