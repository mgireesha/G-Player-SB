import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import def_album_art from '../images/def_album_art.png';
import { ALBUM } from "../redux/GPActionTypes";
import { fetchAlbum, fetchAlbumTacks } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { ShowLyrics } from "./ShowLyrics";
import { Track } from "./Track";

export const Album = () => {
    const dispatch = useDispatch();
    const { albumName } = useParams();
    const album = useSelector(state => state.library.album);
    let albumTracks = useSelector(state => state.library.albumTracks);
    if(albumTracks.length>0){
        albumTracks = albumTracks.sort((a,b) => a.trackNumber - b.trackNumber);
    }
    useEffect(()=>{
        dispatch(fetchAlbumTacks(albumName));
        dispatch(fetchAlbum(albumName));
    },[albumName]);
    useEffect(()=>{
        //dispatch(setGroupband("albums"));
        dispatch(setPlayedFrom({pfKey:ALBUM, pfVal:albumName}));
    },[]);
    return(
        <div className="album">
            {album["albumName"]!==undefined && <div className="album-img-div-container">
                <div className="album-img-div">
                    {album.albumImgAvl && <img src={"/images/albums/"+album.albumName+".jpg"} />}
                    {!album.albumImgAvl && <img src={def_album_art} />}
                </div>
                    <div className="album-details">
                        <h3>{album.albumName}</h3>
                        <Link to={`/music/album_artists/${album.albumArtist}`} >
                            <label style={{cursor:'pointer'}}>{album.albumArtist}</label>
                        </Link>
                        <label>{album.year} - {album.genre}</label>
                    </div>
                <div className="album-lyrics">
                    <ShowLyrics />
                </div>
            </div>}
            <div className="album-track-list">
                {albumTracks.length>0 && albumTracks.map((track, index)=>
                    track.title!==null && <Track track={track} key={index} playedFrom={{pfKey:ALBUM, pfVal:albumName}} index={index}  />
                )}
            </div>
        </div>
    );
}