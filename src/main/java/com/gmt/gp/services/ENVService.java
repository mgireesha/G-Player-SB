package com.gmt.gp.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ENVService {
    @Value("${com.gmt.gp.remote.db.url}")
    private String remoteDbURL;

    @Value("${com.gmt.gp.remote.db.username}")
    private String remoteDbUserName;

    @Value("${com.gmt.gp.remote.db.password}")
    private String remoteDbPassword;

    public Map<String,String> getRemoteDBDetails(){
        return new HashMap<String, String>()
    {
        {
            put("remoteDbURL",remoteDbURL);
            put("remoteDbUserName",remoteDbUserName);
            put("remoteDbPassword",remoteDbPassword);
        }
    };
     //   return null;
    }
}
