package com.example.digital_twin.graph;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/graph")
public class graphcontroller {
    private final graphService graphservice;

    public graphcontroller(graphService graphservice) {
        this.graphservice = graphservice;
    }

    @GetMapping
    public List<graph> getgraphs() {
        return graphservice.getAllGraphs();
    }
}
