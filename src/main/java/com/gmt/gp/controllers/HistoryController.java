package com.gmt.gp.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Library;
import com.gmt.gp.services.HistoryService;
import com.gmt.gp.services.LibraryService;

@RestController
@RequestMapping("/history")
public class HistoryController {
    
    @Autowired
    private HistoryService historyService;

    @Autowired
    private LibraryService libraryService;

    @RequestMapping("/getAllGroupedHistory")
    public Map<String, Object> getAllGroupedHistory(){
        return historyService.getAllGroupedHistory();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/updateHistory/{songId}")
    public GPResponse updateHistory(@PathVariable String songId){
        GPResponse resp = new GPResponse();
        Library library = libraryService.getSongBySongId(Integer.parseInt(songId));
        historyService.updateHistory(library);
        resp.setStatus("SUCCESS");
        return resp;
    }
}
