package com.gmt.gp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Message;
import com.gmt.gp.repositories.MessageRepository;

@Service
public class MessageService {

    private static final String MUSIC_PATH = "MUSIC_PATH";

    private static final String BUILD_STATUS = "BUILD_STATUS";

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMusicPath(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getAllMusicPaths() {
        return messageRepository.getByType(MUSIC_PATH);
    }

    public void removeMessageById(long messageId) {
        messageRepository.deleteById(messageId);
    }

    public void removeMessageType(String type) {
        List<Message> msgTypes = messageRepository.getByType(type);
        for(Message msg : msgTypes)removeMessageById(msg.getMessageId());
    }

    public void updateBuildStatus(String type, String name, String value) {
        Message message = messageRepository.getByName(name);
        if(message==null){
            message = new Message(type, name, value);
        }else{
            message.setValue(value);
        }
        messageRepository.save(message);
    }

    public List<Message> getbuldStatus(){
        return messageRepository.getByType(BUILD_STATUS);
    }

    
    
}
