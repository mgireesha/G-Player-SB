package com.gmt.gp.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class GPUtil {
    
    public static String checkNull(String stringObject){
        if(null==stringObject || "null".equalsIgnoreCase(stringObject) || "".equalsIgnoreCase(stringObject)){
            stringObject=null;    
        }
    return stringObject;   
    }

    public static void ThreadSleep(long time){
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static List<Map.Entry<String, Integer>> splitSortArtists(Map<String, Integer> artistHisCount){
        Map<String, Integer> artistHisCount1 = new LinkedHashMap<String, Integer>();
        String[] artistNameArr = null;
        String artistName = null;
        for(String artistNameO : artistHisCount.keySet()){
            artistName = artistNameO.trim();
            if(artistName.contains(";") || artistName.contains("&")){
                artistName = artistName.replaceAll("[;&]", ",");
            }
            artistNameArr = artistName.split(",");
            for(String artistName1: artistNameArr){
                if(artistHisCount.get(artistNameO)!=null){
                    if(artistHisCount1.get(artistName1)!=null){
                        artistHisCount1.put(artistName1, artistHisCount1.get(artistName1)+artistHisCount.get(artistNameO));
                    }else{
                        artistHisCount1.put(artistName1, artistHisCount.get(artistNameO));
                    }
                }
            }
        }
        // Now, getting all entries from map and
        // convert it to a list using entrySet() method
        List<Map.Entry<String, Integer> > list = new ArrayList<Map.Entry<String, Integer>>(artistHisCount1.entrySet());

        // Using collections class sort method
        // and inside which we are using
        // custom comparator to compare value of map
        Collections.sort(
            list,
            new Comparator<Map.Entry<String, Integer> >() {
                // Comparing two entries by value
                public int compare(
                    Map.Entry<String, Integer> entry1,
                    Map.Entry<String, Integer> entry2)
                {
 
                    // Subtracting the entries
                    return entry2.getValue()
                        - entry1.getValue();
                }
            });
    return list;
    }
}
