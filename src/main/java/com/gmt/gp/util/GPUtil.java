package com.gmt.gp.util;

public class GPUtil {
    
    public static String checkNull(String stringObject){
        if(null==stringObject || "null".equalsIgnoreCase(stringObject) || "".equalsIgnoreCase(stringObject)){
            stringObject=null;    
        }
    return stringObject;   
    }
}
