package com.hotel.ordering;

import com.hotel.reservation.Reservation;
import com.hotel.reservation.ReservationRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class ServiceOrderController {

    private final ServiceOrderRepository orderRepository;
    private final ReservationRepository reservationRepository;

    public ServiceOrderController(ServiceOrderRepository orderRepository, ReservationRepository reservationRepository) {
        this.orderRepository = orderRepository;
        this.reservationRepository = reservationRepository;
    }

    @PostMapping
    public ServiceOrder createOrder(@RequestParam Long reservationId, @RequestBody ServiceOrder order) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + reservationId));
        
        order.setReservation(reservation);
        return orderRepository.save(order);
    }

    @GetMapping("/reservation/{reservationId}")
    public List<ServiceOrder> getOrdersByReservation(@PathVariable Long reservationId) {
        return orderRepository.findByReservationId(reservationId);
    }
}