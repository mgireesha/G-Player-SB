package com.gmt.gp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.Message;
import com.gmt.gp.repositories.MessageRepository;

@Service
public class MessageService {

    private static final String MUSIC_PATH = "MUSIC_PATH";

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
    
}
