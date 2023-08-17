package com.gmt.gp.util;

import java.io.File;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.jaudiotagger.tag.FieldKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

public class GPUtil {

    private static final Logger LOG = LoggerFactory.getLogger(GPUtil.class);

    public static String checkNull(String stringObject) {
        if (null == stringObject || "null".equalsIgnoreCase(stringObject) || "".equalsIgnoreCase(stringObject)) {
            stringObject = null;
        }
        return stringObject;
    }

    public static boolean checkIsNull(String stringObject) {
        if (null == stringObject || "null".equalsIgnoreCase(stringObject) || "".equalsIgnoreCase(stringObject)) {
            return true;
        }
        return false;
    }

    public static void ThreadSleep(long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static List<Map.Entry<String, Integer>> splitSortArtists(Map<String, Integer> artistHisCount) {
        Map<String, Integer> artistHisCount1 = new LinkedHashMap<String, Integer>();
        String[] artistNameArr = null;
        String artistName = null;
        for (String artistNameO : artistHisCount.keySet()) {
            artistName = artistNameO.trim();
            if (artistName.contains(";") || artistName.contains("&")) {
                artistName = artistName.replaceAll("[;&]", ",");
            }
            artistNameArr = artistName.split(",");
            for (String artistName1 : artistNameArr) {
                if (artistHisCount.get(artistNameO) != null) {
                    if (artistHisCount1.get(artistName1) != null) {
                        artistHisCount1.put(artistName1,
                                artistHisCount1.get(artistName1) + artistHisCount.get(artistNameO));
                    } else {
                        artistHisCount1.put(artistName1, artistHisCount.get(artistNameO));
                    }
                }
            }
        }
        // Now, getting all entries from map and
        // convert it to a list using entrySet() method
        List<Map.Entry<String, Integer>> list = new ArrayList<Map.Entry<String, Integer>>(artistHisCount1.entrySet());

        // Using collections class sort method
        // and inside which we are using
        // custom comparator to compare value of map
        Collections.sort(
                list,
                new Comparator<Map.Entry<String, Integer>>() {
                    // Comparing two entries by value
                    public int compare(
                            Map.Entry<String, Integer> entry1,
                            Map.Entry<String, Integer> entry2) {

                        // Subtracting the entries
                        return entry2.getValue()
                                - entry1.getValue();
                    }
                });
        return list;
    }

    public static String restExchange(String uUrl) {
        // String METHOD_NAME = "restExchange";
        String respBody = "";
        try {
            RestTemplate restTemplate = new RestTemplateBuilder()
                    .setConnectTimeout(Duration.ofMillis(30000))
                    .setReadTimeout(Duration.ofMillis(30000))
                    .build();
            HttpHeaders headers = new HttpHeaders();
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(uUrl);
            UriComponents uriComponents = builder.build();
            HttpEntity<String> request = new HttpEntity<String>(headers);
            ResponseEntity<String> response = restTemplate.exchange(uriComponents.toUriString(), HttpMethod.GET,
                    request, String.class);
            // System.out.println(METHOD_NAME + "uUrl: " + uUrl + " response: " + response);
            respBody = response.getBody();
        } catch (Exception e) {
            if (e.getMessage().contains("404 Not Found")) {
                return GP_CONSTANTS.NOT_FOUND;
            } else {
                e.printStackTrace();
            }
        }
        return respBody;
    }

    public static boolean checkAndCreateFolders(String path) {
        boolean isDirExits = false;
        try {
            File folderPath = new File(path);
            if (!folderPath.exists()) {
                isDirExits = folderPath.mkdirs();
            } else {
                isDirExits = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isDirExits;
    }

    public static boolean copyFile(String from, String to, String toDirectory) {
        boolean isCopied = false;
        try {
            File src = new File(from);
            File dest = new File(to);
            if (toDirectory != null) {
                File destDir = new File(toDirectory);
                if (!destDir.exists()) {
                    destDir.mkdir();
                }
            }
            FileUtils.copyFile(src, dest);
            isCopied = true;
        } catch (Exception e) {
            LOG.error("method: copyFile, Failed to copy " + from + " to --> " + to + ", error:" + e.getMessage());
        }
        return isCopied;
    }

    public static String removeExtention(String name, String[] gpFileTypeArr) {
        for (String fileType : gpFileTypeArr) {
            if (name.contains(fileType)) {
                name = name.substring(0, name.length() - fileType.length());
            }
        }
        return name;
    }

    public static FieldKey getFieldKeyForString(String field) {
        FieldKey fieldKey = null;
        switch (field) {
            case "title":
                fieldKey = FieldKey.TITLE;
                break;
            case "album":
                fieldKey = FieldKey.ALBUM;
                break;
            case "artist":
                fieldKey = FieldKey.ARTIST;
                break;
            case "albumArtist":
                fieldKey = FieldKey.ALBUM_ARTIST;
                break;
            case "composer":
                fieldKey = FieldKey.COMPOSER;
                break;
            case "year":
                fieldKey = FieldKey.YEAR;
                break;
            case "genre":
                fieldKey = FieldKey.GENRE;
                break;
            case "lyricist":
                fieldKey = FieldKey.LYRICIST;
                break;
            case "lyrics":
                fieldKey = FieldKey.LYRICS;
                break;
            case "trackNumber":
                fieldKey = FieldKey.TRACK;
                break;
            case "totaltracks":
                fieldKey = FieldKey.TRACK_TOTAL;
                break;
            case "label":
                fieldKey = FieldKey.RECORD_LABEL;
                break;
            case "bpm":
                fieldKey = FieldKey.BPM;
                break;
            case "groupingGP":
                fieldKey = FieldKey.GROUPING;
                break;
            case "language":
                fieldKey = FieldKey.LANGUAGE;
                break;
            default:
                break;
        }
        return fieldKey;
    }
}
