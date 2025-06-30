package com.example.digital_twin.edges;

import jakarta.persistence.*;

@Entity
public class edges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long FirstID; // Latitude of the building's location
    private long SecondID; // Longitude of the building's location
    private String roadtype; // Function of the building (e.g., Office, School)
    private int traffic; // Capacity of the building

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public long getFirstID() { return FirstID; }
    public void setFirstID(long FirstID) { this.FirstID = FirstID; }

    public long getSecondID() { return SecondID; }
    public void setSecondID(long SecondID) { this.SecondID = SecondID; }

    public String getFunctie() { return roadtype; }
    public void setFunctie(String roadtype) { this.roadtype = roadtype; }

    public int getCapaciteit() { return traffic; }
    public void setCapaciteit(int traffic) { this.traffic = traffic; }
}
