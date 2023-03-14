
@REM Uncomment dòng dưới khi gặp lỗi trong quá trình fulltext search
@REM mysql -u root -p hrms_swp490_g2_db < ../../MySQLDB/indexes.sql

mysql -u root -p hrms_swp490_g2_db < ../../MySQLDB/provinces.sql
.\mvnw spring-boot:run
