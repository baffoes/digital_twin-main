package com.example.digital_twin.graph;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class graphService {
    private final graphRepository graphrepository;

    public graphService(graphRepository graphrepository) {
        this.graphrepository = graphrepository;
    }

    public List<graph> getAllGraphs() {
        return graphrepository.findAll();
    }
}
