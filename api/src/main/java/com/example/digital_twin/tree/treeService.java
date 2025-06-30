package com.example.digital_twin.tree;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class treeService {
    private final treeRepository treeRepository;

    public treeService(treeRepository treerepository) {
        this.treeRepository = treerepository;
    }

    public List<tree> getAllTrees() {
        return treeRepository.findAll();
    }
}
