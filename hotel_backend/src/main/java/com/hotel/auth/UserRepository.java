package com.hotel.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Find a user by name (for login checks)
    Optional<User> findByUsername(String username);
}