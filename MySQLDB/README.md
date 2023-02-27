# Backup and restore DB

**You must cd into the MYSQLDB folder to be able to run below commands**
Backup: mysqldump -u root -p hrms_swp490_g2_db > backup.sql
Restore: mysql -u root -p hrms_swp490_g2_db < backup.sql
