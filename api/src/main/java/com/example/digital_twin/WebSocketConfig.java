package com.example.digital_twin;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.WebSocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final BuildingWebSocketHandler buildingWebSocketHandler;

    public WebSocketConfig(BuildingWebSocketHandler buildingWebSocketHandler) {
        this.buildingWebSocketHandler = buildingWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(buildingWebSocketHandler, "/ws/buildings")
                .addInterceptors(new HttpSessionHandshakeInterceptor());
    }
}
