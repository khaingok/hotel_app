package com.hotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HotelBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBackendApplication.class, args);
        System.out.println("Hotel Management Backend is running on http://localhost:8080");
    }

}