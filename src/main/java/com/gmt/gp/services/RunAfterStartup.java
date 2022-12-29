package com.gmt.gp.services;

import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationPreparedEvent;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.stereotype.Component;

@Component
public class RunAfterStartup {
    
    @EventListener(ApplicationPreparedEvent.class)
    public void runAfterStartup() {
        System.out.println("ApplicationPreparedEvent running.......................");
    }
}
