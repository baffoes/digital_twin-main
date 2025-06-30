package com.example.digital_twin.nodes;

import jakarta.persistence.*;

@Entity
public class Nodes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long point1; // Latitude of the building's location
    private long point2; // Longitude of the building's location
    private long point3; // Latitude of the building's location
    private long point4;
    private String type; // Function of the building (e.g., Office, School)
    private int nodeID;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public long getPoint1() { return point1; }
    public void setPoint1(long point1) { this.point1 = point1; }

    public long getPoint2() { return point2; }
    public void setPoint2(long point2) { this.point2 = point2; }

    public long getPoint3() { return point3; }
    public void setPoint3(long point3) { this.point3 = point3; }

    public long getPoint4() { return point4; }
    public void setPoint4(long point4) { this.point4 = point4; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getNodeID() { return nodeID; }
    public void setNodeID(int nodeID) { this.nodeID = nodeID; }
}
