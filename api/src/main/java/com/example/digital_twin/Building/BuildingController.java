package com.example.digital_twin.Building;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getBuildings() {
        return buildingService.getAllBuildings();
    }

    @PostMapping
    public ResponseEntity<Building> saveBuilding(@RequestBody Building building) {
        Building savedBuilding = buildingService.saveBuilding(building);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBuilding);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBuilding(@PathVariable Long id) {
        buildingService.deleteBuilding(id);
    }

    @PutMapping("/closeAll")
    public List<Building> closeAllBuildings() {
        return buildingService.closeAllBuildings(); // Close all buildings
    }
    @PutMapping("/openAll")
    public List<Building> openAllBuildings() {
        return buildingService.openAllBuildings(); // Close all buildings
    }
}
