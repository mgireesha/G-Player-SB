package com.gmt.gp.util;

public class SQL_QUERIES {
    
    public static String getAlbumsGroupedFromHistoryJDBCQuery(int rowCount, String orderBy){
        return  "select "
                    + "his.album, his.count, his.last_played_time, alb.album_artist, alb.year, alb.genre, alb.is_album_img_avl "
                    + "from "
                    + "(select album, sum(count) as count, max(last_played_time) as last_played_time from history group by album) his "
                    + "inner join "
                    + "(select album_name, album_artist,year,genre,is_album_img_avl from album group by album, album_artist,year , genre,is_album_img_avl ) alb "
                    + "on "
                    + "alb.album_name=his.album "
                    + "order by "
                    + "his."+orderBy+" desc "
                    + "fetch first "+rowCount+" rows only;";
    }

    public static String getTopArtistsFromHistoryJDBCQuery(){
        return  "select "
                + "artist, max(count) as count from (select "
                + "his.artist, his.count, his.last_played_time, art.artist_name "
                + "from "
                + "(select artist, sum(count) as count, max(last_played_time) as last_played_time from history group by artist) his "
                + "inner join "
                + "(select artist_name,is_img_avl from artist where type='ARTIST' ) art "
                + "on "
                + "his.artist like CONCAT('%', art.artist_name, '%')) group by artist "
                + "order by count desc "
                + "fetch first 5 rows only;";
    }

    public static String getTopAlbumArtistFromHistoryJDBCQuery(){
        return "select "
                + "his.album_artist, his.count "
                + "from "
                + "(select album_artist, sum(count) as count, max(last_played_time) as last_played_time from history group by album_artist) his "
                + "inner join "
                + "(select artist_name,is_img_avl from artist where type='ALBUM_ARTIST' ) art "
                + "on "
                + "his.album_artist = art.artist_name "
                + "order by count desc " 
                + "fetch first 5 rows only;";
    }
}
