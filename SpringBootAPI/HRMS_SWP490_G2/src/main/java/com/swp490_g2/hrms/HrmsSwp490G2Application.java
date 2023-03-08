package com.swp490_g2.hrms;

import com.swp490_g2.hrms.service.FileService;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HrmsSwp490G2Application implements CommandLineRunner {
    @Resource
    FileService fileService;

    public static void main(String[] args) {
        SpringApplication.run(HrmsSwp490G2Application.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        fileService.init();
    }
}
