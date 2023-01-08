package com.gmt.gp.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.gp.model.History;
import com.gmt.gp.model.Library;
import com.gmt.gp.repositories.HistoryRepository;
import com.gmt.gp.util.DbUtil;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

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

    public Map<String, Object> getAllHistory() {
        Map<String, Object> allHistory = new HashMap<String, Object>();
        allHistory.put("songs", historyRepository.findAllByOrderByLastPlayedTimeDesc());
        List<Map<String, Object>> albums  = getAlbumsGroupedFromHistoryJDBC();
        allHistory.put("albums", albums);
        return allHistory;
    }

    public List<Map<String, Object>> getAlbumsGroupedFromHistoryJDBC(){
        Map<String, Object> album = null;
        List<Map<String, Object>> albumArr = new ArrayList<Map<String, Object>>();
        Connection con = null;
        String query = "select "
                        + "his.album, his.count, his.last_played_time, alb.album_artist, alb.year, alb.genre, alb.is_album_img_avl "
                        + "from "
                        + "(select album, sum(count) as count, max(last_played_time) as last_played_time from history group by album) his "
                        + "inner join "
                        + "(select album_name, album_artist,year,genre,is_album_img_avl from album group by album, album_artist,year , genre,is_album_img_avl ) alb "
                        + "on "
                        + "alb.album_name=his.album "
                        + "order by "
                        + "his.last_played_time desc "
                        + "fetch first 30 rows only;";
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
    
}
