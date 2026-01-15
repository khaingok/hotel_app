package com.hotel.reservation;

import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    // ✅ FIX 1: Add ("id") here
    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable("id") Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
    }
    
    // ✅ FIX 2: Add ("id") here
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable("id") Long id, @RequestBody Reservation updatedReservation) {
        return reservationRepository.findById(id)
                .map(reservation -> {
                    reservation.setGuestName(updatedReservation.getGuestName());
                    reservation.setRoomType(updatedReservation.getRoomType());
                    reservation.setCheckInDate(updatedReservation.getCheckInDate());
                    reservation.setCheckOutDate(updatedReservation.getCheckOutDate());
                    reservation.setNumberOfGuests(updatedReservation.getNumberOfGuests());
                    reservation.setTotalPrice(updatedReservation.getTotalPrice());
                    return reservationRepository.save(reservation);
                })
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
    }

    // ✅ FIX 3: Add ("id") here
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable("id") Long id) {
        reservationRepository.deleteById(id);
    }
}