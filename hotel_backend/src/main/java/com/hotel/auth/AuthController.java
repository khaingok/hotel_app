package com.hotel.auth;

import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // <--- Inject the hasher

    // Constructor Injection
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER (Now with Hashing!)
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // 1. Force role to guest
        user.setRole("guest");

        // 2. Hash the password before saving!
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    @Autowired // Add this
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                
                // GENERATE TOKEN
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
                
                // Return Token + Role + Username to Frontend
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", user.getRole());
                response.put("username", user.getUsername());
                return response;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }
}

