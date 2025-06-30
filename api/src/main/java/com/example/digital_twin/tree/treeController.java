package com.example.digital_twin.tree;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tree")
public class treeController {

    private final treeService treeservice;

    public treeController(treeService treeservice) {
        this.treeservice = treeservice;
    }

    @GetMapping
    public List<tree> getTrees() {
        return treeservice.getAllTrees();
    }
}
