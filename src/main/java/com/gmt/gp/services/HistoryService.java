package com.gmt.gp.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.History;
import com.gmt.gp.model.Library;
import com.gmt.gp.repositories.HistoryRepository;
import com.gmt.gp.util.DbUtil;
import com.gmt.gp.util.GPUtil;
import com.gmt.gp.util.SQL_QUERIES;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    @Lazy
    private LibraryService libraryService;

    public void updateHistory(Library song) {
        History history =  historyRepository.getBySongId(song.getSongId());
        if(history!=null){
            history.setCount(history.getCount()+1);
        }else{
            history = new History(song);
            history.setCount(1);
        }
        history.setLastPlayedTime(LocalDateTime.now());
        historyRepository.save(history);
    }

    public List<History> getAllHistory(){
        return (List<History>) historyRepository.findAll();
    }

    public Map<String, Object> getAllGroupedHistory() {
        Map<String, Object> allHistory = new HashMap<String, Object>();
        allHistory.put("songs", historyRepository.findTop30ByOrderByLastPlayedTimeDesc());
        allHistory.put("albums", getAlbumsGroupedFromHistoryJDBC(30, "last_played_time"));
        return allHistory;
    }

    public List<Map<String, Object>> getAlbumsGroupedFromHistoryJDBC(int rowCount, String orderBy){
        Map<String, Object> album = null;
        List<Map<String, Object>> albumArr = new ArrayList<Map<String, Object>>();
        Connection con = null;
        String query = SQL_QUERIES.getAlbumsGroupedFromHistoryJDBCQuery(rowCount, orderBy);
        try {
            con = DbUtil.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                album = new HashMap<String, Object>();
                album.put("albumName", rs.getString("ALBUM"));
                album.put("albumArtist", rs.getString("ALBUM_ARTIST"));
                album.put("year", rs.getInt("YEAR"));
                album.put("genre", rs.getString("GENRE"));
                album.put("albumImgAvl", rs.getString("IS_ALBUM_IMG_AVL"));
                album.put("lastPlayedTime", rs.getTimestamp("LAST_PLAYED_TIME"));
                album.put("count", rs.getInt("COUNT"));
                albumArr.add(album);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return albumArr;
    }

    public void removeAll(List<History> historyListR) {
        historyRepository.deleteAll(historyListR);
    }

    public void saveAll(List<History> historyListU) {
        historyRepository.saveAll(historyListU);
    }
    
    public Map<String, Object> getMostPlayedData(){
        Map<String, Object> finalRes = new HashMap<String, Object>();
        Map<String, Integer> hisCount = executeMostPlayedHisQuery(SQL_QUERIES.getTopArtistsFromHistoryJDBCQuery());
        List<Map.Entry<String, Integer>> list = GPUtil.splitSortArtists(hisCount);
        List<Object> pData = new ArrayList<Object>();
        int counter = 0;
        for (Map.Entry<String, Integer> l : list) {
            counter++;
            pData.add(libraryService.getByArtistNameAndType(l.getKey().trim(), "ARTIST"));
            if(counter==5)break;
        }
        finalRes.put("ARTISTS", pData);
        pData = new ArrayList<Object>();
        
        hisCount = executeMostPlayedHisQuery(SQL_QUERIES.getTopAlbumArtistFromHistoryJDBCQuery());
        for(String albumArtistName : hisCount.keySet()){
            pData.add(libraryService.getByArtistNameAndType(albumArtistName, "ALBUM_ARTIST"));
        }
        finalRes.put("ALBUM_ARTISTS", pData);
        pData = new ArrayList<Object>();

        finalRes.put("ALBUMS", getAlbumsGroupedFromHistoryJDBC(5, "count"));

        return finalRes;
    }

    private Map<String, Integer> executeMostPlayedHisQuery(String query){
        Connection con = null;
        Map<String, Integer> hisRes = new LinkedHashMap<String, Integer>();
        try {
            con = DbUtil.getConnection();
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                hisRes.put(rs.getString(1), rs.getInt(2));
            }
        } catch (Exception e) {
           e.printStackTrace();
        }
    return hisRes;
    }
}
