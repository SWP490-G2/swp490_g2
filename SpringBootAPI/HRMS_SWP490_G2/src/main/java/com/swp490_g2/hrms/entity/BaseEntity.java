package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.swp490_g2.hrms.common.utils.DateUtils;
import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
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

    @Column(insertable = false, updatable = false, nullable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddTHH:mm:ssZ")
    private Date createdAt;

    @Column
    private Long modifiedBy;

    @Column(insertable = false, updatable = false, nullable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-ddTHH:mm:ssZ")
    private Date modifiedAt;

//    @JsonGetter("createdAt")
//    public String getCreatedAt(){
//        return DateUtils.format(this.createdAt, DateUtils.DATE_FORMAT_3);
//    }
//
//    @JsonGetter("modifiedAt")
//    public String getModifiedAt(){
//        return DateUtils.format(this.modifiedAt, DateUtils.DATE_FORMAT_3);
//    }
}
