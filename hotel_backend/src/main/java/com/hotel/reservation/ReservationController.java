package com.hotel.reservation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Reservation ID " + id + " not found.");
        }
    }
    
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable("id") Long id, @RequestBody Reservation updatedReservation) {
        return reservationRepository.findById(id).map(r -> {
             return reservationRepository.save(r);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable("id") Long id) {
        reservationRepository.deleteById(id);
    }
}