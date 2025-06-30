package com.example.digital_twin.tree;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class tree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String treetype;
    private long latitude; // Latitude of the building's location
    private long longitude; // Longitude of the building's location// Whether the building is open or closed

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String gettreetype() { return treetype; }
    public void settreetype(String treetype) { this.treetype = treetype; }

    public long getLatitude() { return latitude; }
    public void setLatitude(long latitude) { this.latitude = latitude; }

    public long getLongitude() { return longitude; }
    public void setLongitude(long longitude) { this.longitude = longitude; }
}
