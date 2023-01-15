package com.gmt.gp.services;

import com.gmt.gp.util.SQL_QUERIES;

public class Testj {
    public static void main(String[] args) {
        try {
           Testj.print_SQL_QUERIES();
         } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void print_SQL_QUERIES(){
        System.out.println("getAlbumsGroupedFromHistoryJDBCQuery , 10 rows, order by count");
        System.out.println(SQL_QUERIES.getAlbumsGroupedFromHistoryJDBCQuery(10, "count"));
        System.out.println("-----------------------------------------------------------------------------------");
        System.out.println("getTopArtistsFromHistoryJDBCQuery");
        System.out.println(SQL_QUERIES.getTopArtistsFromHistoryJDBCQuery());
        System.out.println("-----------------------------------------------------------------------------------");
        System.out.println("getTopAlbumArtistFromHistoryJDBCQuery");
        System.out.println(SQL_QUERIES.getTopAlbumArtistFromHistoryJDBCQuery());
        System.out.println("-----------------------------------------------------------------------------------");
    }
}
