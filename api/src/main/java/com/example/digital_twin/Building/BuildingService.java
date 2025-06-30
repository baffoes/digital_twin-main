package com.example.digital_twin.Building;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
 public class BuildingService {
    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Building saveBuilding(Building building) {
        return buildingRepository.save(building);
    }

    public void deleteBuilding(Long id) {
        buildingRepository.deleteById(id);
    }


    public List<Building> closeAllBuildings() {
        // Fetch all buildings
        List<Building> buildings = buildingRepository.findAll();

        // Set each building to closed (isOpen = false)
        for (Building building : buildings) {
            building.setIsOpen(false); // Mark as closed
            buildingRepository.save(building); // Save the updated status back to the database
        }
        return buildings;
    }

    public List<Building> openAllBuildings() {
        // Fetch all buildings
        List<Building> buildings = buildingRepository.findAll();

        // Set each building to closed (isOpen = false)
        for (Building building : buildings) {
            building.setIsOpen(true); // Mark as closed
            buildingRepository.save(building); // Save the updated status back to the database
        }
        return buildings;
    }
}
