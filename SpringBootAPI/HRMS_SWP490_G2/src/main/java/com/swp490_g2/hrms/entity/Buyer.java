package com.swp490_g2.hrms.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "buyer")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class Buyer extends User{
}
