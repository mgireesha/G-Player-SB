package com.gmt.gp.services;

import java.util.HashMap;
import java.util.Map;

public class Testj {
    public static void main(String[] args) {
        try {
            String test = "ads;asd&ad&";
            System.out.println("test.contains: "+test.contains(";"));
            test = test.replaceAll("[;&]", ",");
            System.out.println("test: "+test);
            Map<String , Integer> sdfsd = new HashMap<String, Integer>();
            System.out.println("sdfsd: "+sdfsd.get("sfs"));
            Runtime rt = Runtime.getRuntime();
            String url = "http://stackoverflow.com";
            rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
         } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
