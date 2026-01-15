package com.hotel.ordering;

import com.hotel.reservation.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; 
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_orders")
public class ServiceOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ FIX: Use 'serviceType' (matches Frontend JSON)
    // ❌ OLD: private String serviceName; 
    @Column(nullable = false)
    private String serviceType; 

    @Column(nullable = false)
    private Double price;

    private String status; 

    private LocalDateTime orderTime = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "reservation_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private Reservation reservation;

    // --- MANUAL GETTERS & SETTERS (Must match the field name!) ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }

    public Reservation getReservation() { return reservation; }
    public void setReservation(Reservation reservation) { this.reservation = reservation; }
}