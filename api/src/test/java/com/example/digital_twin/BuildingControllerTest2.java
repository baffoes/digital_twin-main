package com.example.digital_twin;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingController;
import com.example.digital_twin.Building.BuildingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class BuildingControllerTest2 {

    @Mock
    private BuildingService buildingService;

    @InjectMocks
    private BuildingController buildingController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        // Initialize the MockMvc object before each test
        mockMvc = MockMvcBuilders.standaloneSetup(buildingController).build();
    }

    @Test
    void testGetBuildings() throws Exception {

        Building building1 = new Building();
        building1.setId(1L);
        building1.setLatitude(52);
        building1.setLongitude(5);
        building1.setCapaciteit(100);
        building1.setFunctie("Office");
        building1.setIsOpen(true);

        Building building2 = new Building();
        building2.setId(2L);
        building2.setLatitude(53);
        building2.setLongitude(5);
        building2.setCapaciteit(150);
        building2.setFunctie("Warehouse");
        building2.setIsOpen(false);

        List<Building> buildings = Arrays.asList(building1, building2);

        // Mock the service call
        when(buildingService.getAllBuildings()).thenReturn(buildings);

        // Perform the GET request and assert the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/buildings"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{'id':1,'latitude':52,'longitude':5,'functie':'Office','capaciteit':100,'isOpen':true},{'id':2,'latitude':53,'longitude':5,'functie':'Warehouse','capaciteit':150,'isOpen':false}]"));
    }
}
