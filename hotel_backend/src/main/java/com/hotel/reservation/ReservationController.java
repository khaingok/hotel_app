package com.hotel.reservation;

import org.springframework.http.HttpStatus; // <--- Add this
import org.springframework.http.ResponseEntity; // <--- Add this
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional; // <--- Add this

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // ... (Keep getAllReservations and createReservation as they are) ...
    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    // ✅ FIX: Use ResponseEntity to handle "Not Found" gracefully
    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            // Return 404 (Not Found) instead of Crashing
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Reservation ID " + id + " not found.");
        }
    }
    
    // ... (Keep PUT and DELETE methods as they are) ...
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable("id") Long id, @RequestBody Reservation updatedReservation) {
        // ... existing code ...
        return reservationRepository.findById(id).map(r -> {
             // ... set fields ...
             return reservationRepository.save(r);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable("id") Long id) {
        reservationRepository.deleteById(id);
    }
}