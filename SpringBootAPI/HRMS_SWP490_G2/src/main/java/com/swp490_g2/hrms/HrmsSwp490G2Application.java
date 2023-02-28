package com.swp490_g2.hrms;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class HrmsSwp490G2Application {

    public static void main(String[] args) {
        SpringApplication.run(HrmsSwp490G2Application.class, args);
    }

}
