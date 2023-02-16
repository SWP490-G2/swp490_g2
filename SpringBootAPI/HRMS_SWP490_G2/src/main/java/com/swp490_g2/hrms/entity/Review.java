package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.swp490_g2.hrms.entity.id.ReviewId;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review implements Serializable {

    @EmbeddedId
    private ReviewId reviewId;

    @Column(name = "rate", nullable = false)
    private Integer rate;

    @Column(name = "comment", nullable = true)
    private String comment;

    @Column(name = "created_at")
    @JsonIgnore
    private Date createdAt;

    @Column(name = "modified_at")
    private Date modifiedAt;

}
