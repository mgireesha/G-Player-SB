import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBuildStatus, fetchMostPlayedData } from "../redux/library/LibraryActions";
import { AlbumThumb } from "./AlbumThumb";
import { AlbumArtistThumb } from "./artist/AlbumArtistThumb";
import { Artist } from "./artist/Artist";
import { ArtistThumb } from "./artist/ArtistThumb";
export const Music = () => {
    const dispatch = useDispatch();
    const mostPlayedData = useSelector(state => state.library.mostPlayedData);
    const buildStatus = useSelector(state => state.library.buildStatus);
    const [buildStatusL, setBuildStatusL] = useState(null);
    const [artists, setArtists] = useState([]);
    const [albumArtists, setAlbumArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    console.log("mostPlayedData",mostPlayedData)

    useEffect(()=>{
        dispatch(fetchMostPlayedData());
        dispatch(fetchBuildStatus());
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

    useEffect(()=>{
        let tempBuildStatusL = {};
        if(buildStatus.length>0){
            buildStatus.forEach(element => {
                tempBuildStatusL[element.name]=element.value;
            });
            setBuildStatusL(tempBuildStatusL);
        }
    },[buildStatus]);

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
            <div className="statisticts">
                {buildStatusL!==null &&
                    <div className="groups">
                        <div className="group">
                            <Link to="/music/tracks"><h1>Tracks</h1></Link>
                            <Link to="/music/tracks"><h2>{buildStatusL.TOTAL_TRACKS}</h2></Link>
                        </div>
                        <div className="group">
                            <Link to="/music/albums"><h1>Albums</h1></Link>
                            <Link to="/music/albums"><h2>{buildStatusL.ALBUM_COUNT}</h2></Link>
                        </div>
                        <div className="group">
                            <Link to="/music/album_artists"><h1>Album Artists</h1></Link>
                            <Link to="/music/album_artists"><h2>{buildStatusL.ALBUM_ARTIST_COUNT}</h2></Link>
                        </div>
                        <div className="group">
                            <Link to="/music/artists"><h1>Artists</h1></Link>
                            <Link to="/music/artists"><h2>{buildStatusL.ARTIST_COUNT}</h2></Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}