package com.hotel.user;

import com.hotel.auth.User;
import com.hotel.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/search")
    public ResponseEntity<?> getUserProfile(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        
        if (user.isPresent()) {
            User foundUser = user.get();
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", foundUser.getId());
            response.put("username", foundUser.getUsername());
            response.put("name", foundUser.getName());
            response.put("role", foundUser.getRole());
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return userRepository.findById(id).map(user -> {
            if (payload.containsKey("name")) {
                user.setName(payload.get("name"));
            }
            userRepository.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("name", user.getName());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.status(404).build());
    }
}