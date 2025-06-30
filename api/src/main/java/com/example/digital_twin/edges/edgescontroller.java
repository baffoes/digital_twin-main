package com.example.digital_twin.edges;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/edges")
public class edgescontroller {
    private final edgesService edgeservice;

    public edgescontroller(edgesService edgeservice) {
        this.edgeservice = edgeservice;
    }

    @GetMapping
    public List<edges> getEdges() {
        return edgeservice.getAllEdges();
    }
}
