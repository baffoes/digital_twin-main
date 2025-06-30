package com.example.digital_twin.Event;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate startDateEvent;

    private LocalDate endDateEvent;

    private String description;


    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDateEvent() {
        return startDateEvent;
    }

    public void setStartDateEvent(LocalDate startDateEvent) {
        this.startDateEvent = startDateEvent;
    }

    public LocalDate getEndDateEvent() {
        return endDateEvent;
    }

    public void setEndDateEvent(LocalDate endDateEvent) {
        this.endDateEvent = endDateEvent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
