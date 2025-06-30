package com.example.digital_twin.nodes;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/nodes")
public class nodesController {

    private final nodesService nodeService;

    public nodesController(nodesService nodeService) {
        this.nodeService = nodeService;
    }

    @GetMapping
    public List<Nodes> getnodes() {
        return nodeService.getAllNodes();
    }
}