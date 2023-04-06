package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "file")
@AttributeOverride(name = "id", column = @Column(name = "fileId"))
public class File extends BaseEntity{
    @Column(nullable = false)
    private String filePath;
//
//    @ManyToOne
//    @JoinColumn(name = "productId", nullable = false)
//    @JsonBackReference
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Product product;
}
