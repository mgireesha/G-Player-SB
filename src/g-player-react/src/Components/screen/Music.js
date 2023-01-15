import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostPlayedData } from "../redux/library/LibraryActions";
import { AlbumThumb } from "./AlbumThumb";
import { AlbumArtistThumb } from "./artist/AlbumArtistThumb";
import { Artist } from "./artist/Artist";
import { ArtistThumb } from "./artist/ArtistThumb";
export const Music = () => {
    const dispatch = useDispatch();
    const mostPlayedData = useSelector(state => state.library.mostPlayedData);
    const [artists, setArtists] = useState([]);
    const [albumArtists, setAlbumArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    console.log("mostPlayedData",mostPlayedData)

    useEffect(()=>{
        dispatch(fetchMostPlayedData());
    },[]);

    useEffect(()=>{
        if(mostPlayedData["ARTISTS"]!==undefined){
            setArtists(mostPlayedData["ARTISTS"]);
        }
        if(mostPlayedData["ALBUM_ARTISTS"]!==undefined){
            setAlbumArtists(mostPlayedData["ALBUM_ARTISTS"]);
        }
        if(mostPlayedData["ALBUMS"]!==undefined){
            setAlbums(mostPlayedData["ALBUMS"]);
        }
    },[mostPlayedData]);

    return(
        <div className="music">
            <h3>Popular Artists</h3>
            <div className="artists-list">
                {artists.length>0 && artists.map((artist, index)=>
                    <ArtistThumb artist={artist} key={index} />
                )}
            </div>
            <h3>Most Played Albums</h3>
            <div className="albums-list">
                {albums.length>0 && albums.map((album, index)=>
                    <AlbumThumb album={album} key={index} />
                )}
            </div>
            <h3>Popular Composers</h3>
            <div className="album-artists-list">
                {albumArtists.length>0 && albumArtists.map((albumArtist, index)=>
                    <AlbumArtistThumb albumArtist={albumArtist} key={index} />
                )}
            </div>
        </div>
    );
}