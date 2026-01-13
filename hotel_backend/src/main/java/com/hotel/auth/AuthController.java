package com.hotel.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

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

    // LOGIN (Now with Hash Comparison!)
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // 3. Use matches() to compare Raw Password vs Stored Hash
            // (Do NOT use .equals() anymore, because the hash looks different every time)
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return user;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }
}