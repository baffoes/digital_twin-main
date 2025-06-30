package com.example.digital_twin;

import com.example.digital_twin.Building.Building;
import com.example.digital_twin.Building.BuildingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;

@Component
public class BuildingWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private BuildingService buildingService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Called when the WebSocket connection is established
        System.out.println("Connection established with: " + session.getId());

        // Send all building data to the client when they connect
        List<Building> buildings = buildingService.getAllBuildings();
        String payload = new ObjectMapper().writeValueAsString(buildings);
        session.sendMessage(new TextMessage(payload));
    }
}
