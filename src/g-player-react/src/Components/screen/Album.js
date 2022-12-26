import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import def_album_art from '../images/def_album_art.png';
import { ALBUM } from "../redux/GPActionTypes";
import { fetchAlbum, fetchAlbumImgs, setGroupband } from "../redux/library/LibraryActions";
import { setPlayedFrom } from "../redux/player/PlayerActions";
import { ShowLyrics } from "./ShowLyrics";
import { Track } from "./Track";

export const Album = () => {
    const dispatch = useDispatch();
    const { albumName } = useParams();
    const [albumImg, setAlbumImg] = useState(null);
    const albumImgs = useSelector(state => state.library.albumImgs);
    const albumsDetails = useSelector(state => state.library.albumsDetails);
    let album = useSelector(state => state.library.album);
    if(album!==null && album!==undefined){
        album = album.sort((a,b) => a.trackNumber - b.trackNumber);
    }
    useEffect(()=>{
        if(albumImgs!==null && albumImgs[albumName]!==undefined){
            setAlbumImg(albumImgs[albumName]);
        }else{
            dispatch(fetchAlbumImgs());
            setAlbumImg(null);
        }
        dispatch(fetchAlbum(albumName));
    },[albumName, albumImgs]);
    useEffect(()=>{
        dispatch(setGroupband("albums"));
        dispatch(setPlayedFrom(ALBUM));
    },[]);
    return(
        <div className="album">
            <div className="album-img-div-container">
                <div className="album-img-div">
                    {albumImg !==null && <img src={albumImg} />}
                    {albumImg ===null && <img src={def_album_art} />}
                </div>
                {albumsDetails !== null && albumsDetails !== undefined && albumsDetails[albumName] !== undefined &&
                    <>
                        <div className="album-details">
                            <h3>{albumsDetails[albumName].album}</h3>
                            <Link to={`/music/album_artists/${albumsDetails[albumName].albumArtist}`} >
                                <label style={{cursor:'pointer'}}>{albumsDetails[albumName].albumArtist}</label>
                            </Link>
                            <label>{albumsDetails[albumName].year} - {albumsDetails[albumName].genre}</label>
                        </div>
                    </>
                }
                <div className="album-lyrics">
                    <ShowLyrics />
                </div>
            </div>
            <div className="album-track-list">
                {album!==null && album!==undefined && album.map((track, index)=>
                    track.title!==null && <Track track={track} key={index} playedFrom={ALBUM} index={index}  />
                )}
            </div>
        </div>
    );
}