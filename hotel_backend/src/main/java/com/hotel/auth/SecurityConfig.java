package com.hotel.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // 1. Define the BCrypt Bean so we can inject it into our Controller
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Configure the "Security Chain" to allow all requests (for now)
    // If we don't do this, Spring Boot will block your React App with a 401/403 Error.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simple API testing
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Allow everyone to access everything (Login/Register/Reservations)
            );
        
        return http.build();
    }
}