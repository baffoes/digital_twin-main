package com.example.digital_twin.nodes;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class nodesService {
    private final nodesRepository noderepository;

    public nodesService(nodesRepository noderepository) {
        this.noderepository = noderepository;
    }

    public List<Nodes> getAllNodes() {
        return noderepository.findAll();
    }
}
