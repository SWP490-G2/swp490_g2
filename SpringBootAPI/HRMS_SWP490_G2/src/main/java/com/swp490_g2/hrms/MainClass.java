package com.swp490_g2.hrms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainClass {

    @GetMapping("")
    public String show(){
        return "index";
    }
    
}
