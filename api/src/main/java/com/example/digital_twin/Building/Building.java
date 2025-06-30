package com.example.digital_twin.Building;

import jakarta.persistence.*;

@Entity
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long latitude; // Latitude of the building's location
    private long longitude; // Longitude of the building's location
    private String functie; // Function of the building (e.g., Office, School)
    private int capaciteit; // Capacity of the building
    private boolean isOpen; // Whether the building is open or closed

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public long getLatitude() { return latitude; }
    public void setLatitude(long latitude) { this.latitude = latitude; }

    public long getLongitude() { return longitude; }
    public void setLongitude(long longitude) { this.longitude = longitude; }

    public String getFunctie() { return functie; }
    public void setFunctie(String functie) { this.functie = functie; }

    public int getCapaciteit() { return capaciteit; }
    public void setCapaciteit(int capaciteit) { this.capaciteit = capaciteit; }

    public boolean getIsOpen() { return isOpen; }
    public void setIsOpen(boolean isOpen) { this.isOpen = isOpen; }
}
