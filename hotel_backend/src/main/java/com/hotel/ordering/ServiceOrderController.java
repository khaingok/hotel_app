package com.hotel.ordering;

import com.hotel.reservation.Reservation;
import com.hotel.reservation.ReservationRepository;
import org.springframework.http.HttpStatus; // <--- Import this
import org.springframework.http.ResponseEntity; // <--- Import this
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional; // <--- Import this

@RestController
@RequestMapping("/api/orders")
public class ServiceOrderController {

    private final ServiceOrderRepository orderRepository;
    private final ReservationRepository reservationRepository;

    public ServiceOrderController(ServiceOrderRepository orderRepository, ReservationRepository reservationRepository) {
        this.orderRepository = orderRepository;
        this.reservationRepository = reservationRepository;
    }

    // ✅ UPDATED: Returns ResponseEntity to handle errors gracefully
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestParam("reservationId") Long reservationId, @RequestBody ServiceOrder order) {
        
        // 1. Try to find the reservation safely
        Optional<Reservation> reservationOpt = reservationRepository.findById(reservationId);
        
        // 2. If NOT found, return 404 (Not Found) instead of Crashing (500)
        if (reservationOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Error: Reservation ID " + reservationId + " does not exist.");
        }
        
        // 3. If found, save the order
        order.setReservation(reservationOpt.get());
        ServiceOrder savedOrder = orderRepository.save(order);
        
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/reservation/{reservationId}")
    public List<ServiceOrder> getOrdersByReservation(@PathVariable("reservationId") Long reservationId) {
        return orderRepository.findByReservationId(reservationId);
    }

    @GetMapping
    public List<ServiceOrder> getAllOrders() {
        return orderRepository.findAll();
    }
}