package com.gmt.gp.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gmt.gp.model.Playlist;
import com.gmt.gp.model.PlaylistItem;
import com.gmt.gp.util.DaoException;
import com.gmt.gp.util.DbUtil;

@Component
public class RemoteDBService {

    @Autowired
    private ENVService envService;

    public List<Playlist> getAllPlaylists(){
        String query = "SELECT * FROM PLAYLIST";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        List<Playlist> playlistsR = new ArrayList<Playlist>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        Playlist playlist = null;
        try {
            connection = DbUtil.getCloudPostgreSQLConnection(envService.getRemoteDBDetails());
            statement = connection.createStatement();
            resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                playlist = new Playlist(
                    resultSet.getString("NAME"),
                    LocalDateTime.parse(trimMilliSeconds(resultSet.getString("CREATED_DATE")), formatter),
                    LocalDateTime.parse(trimMilliSeconds(resultSet.getString("LAST_UPDATED")), formatter)
                );
                playlistsR.add(playlist);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            try {
                DbUtil.closeResources(connection, statement, resultSet);
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
        return playlistsR;
    }

    public List<Playlist> savePlaylists(List<Playlist> playlists){
        StringBuilder query = new StringBuilder("INSERT INTO PLAYLIST (ID, CREATED_DATE, LAST_UPDATED, NAME) VALUES ");
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        List<Playlist> playlistsR = new ArrayList<Playlist>();
        try {
            for (int i = 0; i < playlists.size(); i++)
                query.append("(?, ?, ?, ?), ");

            query = new StringBuilder(query.substring(0, query.length() - 2));
            System.out.println("query: "+query.toString());
            connection = DbUtil.getCloudPostgreSQLConnection(envService.getRemoteDBDetails());
            preparedStatement = connection.prepareStatement(query.toString());
            Long currentMaxId = getRemoteTableId("PLAYLIST");
            for (int i = 0; i < playlists.size(); i++) {
                preparedStatement.setLong((i * 4) + 1, ++currentMaxId);
                preparedStatement.setObject((i * 4) + 2, playlists.get(i).getCreatedDate());
                preparedStatement.setObject((i * 4) + 3, playlists.get(i).getLastUpdated());
                preparedStatement.setString((i * 4) + 4, String.valueOf(playlists.get(i).getName()));
            }
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            try {
                DbUtil.closeResources(connection, preparedStatement);
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
        return playlistsR;
    }

    public List<PlaylistItem> getAllPlaylistItems() {
        String query = "SELECT * FROM PLAYLIST_ITEM";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        List<PlaylistItem> playlistItemsR = new ArrayList<PlaylistItem>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        PlaylistItem playlistItem = null;
        try {
            connection = DbUtil.getCloudPostgreSQLConnection(envService.getRemoteDBDetails());
            statement = connection.createStatement();
            resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                playlistItem = new PlaylistItem(
                    resultSet.getLong("ID"),
                    resultSet.getString("PLAYLIST"),
                    resultSet.getLong("PLAYLIST_ID"),
                    resultSet.getString("SONG_PATH"),
                    resultSet.getString("ALBUM_NAME"),
                    resultSet.getLong("ALBUM_ID"),
                    resultSet.getLong("SONG_ID"),
                    resultSet.getString("SONG_TITLE"),
                    resultSet.getString("CREATED_DATE")!=null?LocalDateTime.parse(trimMilliSeconds(resultSet.getString("CREATED_DATE")), formatter):null,
                    resultSet.getString("LAST_UPDATED")!=null?LocalDateTime.parse(trimMilliSeconds(resultSet.getString("LAST_UPDATED")), formatter):null
                );
                playlistItemsR.add(playlistItem);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            try {
                DbUtil.closeResources(connection, statement, resultSet);
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
        return playlistItemsR;
    }

    public void savePlaylistItems(List<PlaylistItem> playlistItems) {
        StringBuilder query = new StringBuilder("INSERT INTO PLAYLIST_ITEM (ID, ALBUM_ID, ALBUM_NAME, PLAYLIST, PLAYLIST_ID, SONG_TITLE, SONG_ID, CREATED_DATE, LAST_UPDATED) VALUES ");
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            for (int i = 0; i < playlistItems.size(); i++)
                query.append("(?, ?, ?, ?, ?, ?, ?, ?, ?), ");

            query = new StringBuilder(query.substring(0, query.length() - 2));
            System.out.println("query: "+query.toString());
            connection = DbUtil.getCloudPostgreSQLConnection(envService.getRemoteDBDetails());
            preparedStatement = connection.prepareStatement(query.toString());
            Long currentMaxId = getRemoteTableId("PLAYLIST_ITEM");
            for (int i = 0; i < playlistItems.size(); i++) {
                preparedStatement.setLong((i * 9) + 1, ++currentMaxId);
                preparedStatement.setLong((i * 9) + 2, playlistItems.get(i).getAlbumId());
                preparedStatement.setString((i * 9) + 3, playlistItems.get(i).getAlbumName());
                preparedStatement.setString((i * 9) + 4, playlistItems.get(i).getPlaylist());
                preparedStatement.setLong((i * 9) + 5, playlistItems.get(i).getPlaylistId());
                preparedStatement.setString((i * 9) + 6, playlistItems.get(i).getSongTitle());
                preparedStatement.setLong((i * 9) + 7, playlistItems.get(i).getSongId());
                preparedStatement.setObject((i * 9) + 8, playlistItems.get(i).getCreatedDate());
                preparedStatement.setObject((i * 9) + 9, playlistItems.get(i).getLastUpdated());
            }
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            try {
                DbUtil.closeResources(connection, preparedStatement);
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
    }

    private Long getRemoteTableId(String tableName){
        String query = "select max(ID) from playlist";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        long id = 0;
        try {
            connection =  DbUtil.getCloudPostgreSQLConnection(envService.getRemoteDBDetails());
            statement = connection.createStatement();
            resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                id = resultSet.getInt(1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }{
            try {
                DbUtil.closeResources(connection, statement, resultSet);
            } catch (DaoException e) {
                e.printStackTrace();
            }
        }
        return id;
    }

    private String trimMilliSeconds(String timeString){
        if (timeString==null)return timeString;
        int lastIndex = timeString.lastIndexOf(".");
        return timeString.substring(0, lastIndex);
    }

    

    
}
