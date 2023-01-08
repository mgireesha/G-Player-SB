package com.gmt.gp.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.services.HistoryService;

@RestController
@RequestMapping("/history")
public class HistoryController {
    
    @Autowired
    private HistoryService historyService;

    @RequestMapping("/getAllHistory")
    public Map<String, Object> getAllHistory(){
        return historyService.getAllHistory();
    }
}
