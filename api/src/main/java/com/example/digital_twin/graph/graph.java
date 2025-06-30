package com.example.digital_twin.graph;

import jakarta.persistence.*;
@Entity
public class graph {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private int busyness;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    int getBusyness() { return busyness; }
    public void setBusyness(int busyness) { this.busyness = busyness; }
}
