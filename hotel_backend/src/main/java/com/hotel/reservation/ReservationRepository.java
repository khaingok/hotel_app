package com.hotel.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    // Custom query: Find all reservations for a specific guest
    List<Reservation> findByGuestName(String guestName);
    
    // Custom query: Find reservations by status (e.g., "CANCELLED")
    List<Reservation> findByStatus(String status);
}