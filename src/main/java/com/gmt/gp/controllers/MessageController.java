package com.gmt.gp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.gp.model.GPResponse;
import com.gmt.gp.model.Message;
import com.gmt.gp.services.MessageService;

@RestController
@RequestMapping("/message")
@CrossOrigin
public class MessageController {
    
    private static final String FAILED = "FAILED";

    private static final String SUCCESS = "SUCCESS";

    @Autowired
    private MessageService messageService;

    @RequestMapping(method = RequestMethod.POST , value = "/saveMusicPath")
    public Message saveMusicPath(@RequestBody Message message){
        return messageService.saveMusicPath(message);
    }

    @RequestMapping("/getAllMusicPaths")
    public List<Message> getAllMusicPaths(){
        return messageService.getAllMusicPaths();
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/removeMusicPath/{messageId}")
    public GPResponse removeMusicPath(@PathVariable String messageId){
        GPResponse resp = new GPResponse(FAILED, null, null);
        try {
            messageService.removeMessageById(Long.parseLong(messageId));
            resp.setStatus(SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return resp;
    }

    @RequestMapping("/getBuildStatus")
    public List<Message> getBuildStatus(){
        return messageService.getbuldStatus();
    }
}
