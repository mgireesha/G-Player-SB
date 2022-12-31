package com.gmt.gp.services;

public class Testj {
    public static void main(String[] args) {
        try {
            String test = "ads;asd&ad&";
            System.out.println("test.contains: "+test.contains(";"));
            test = test.replaceAll("[;&]", ",");
            System.out.println("test: "+test);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
