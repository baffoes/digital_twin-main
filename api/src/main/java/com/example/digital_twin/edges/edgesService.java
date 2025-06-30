package com.example.digital_twin.edges;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class edgesService {
    private final edgesRepository edgerepository;

    public edgesService(edgesRepository edgerepository) {
        this.edgerepository = edgerepository;
    }

    public List<edges> getAllEdges() {
        return edgerepository.findAll();
    }
}
