package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.swp490_g2.hrms.common.utils.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseEntity {

    public BaseEntity(Long id) {
        this.id = id;
    }

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long createdBy;

    @Column
    @JsonIgnore
    private Date createdAt;

    @Column
    @JsonIgnore
    private Long modifiedBy;

    @Column
    private Date modifiedAt;

    @JsonGetter("createdAt")
    public String getCreatedAt(){
        return DateUtils.format(this.createdAt, DateUtils.DATE_FORMAT_3);
    }

    @JsonGetter("modifiedAt")
    public String getModifiedAt(){
        return DateUtils.format(this.modifiedAt, DateUtils.DATE_FORMAT_3);
    }
}
