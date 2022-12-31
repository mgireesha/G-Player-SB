import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM_ARTIST, ALBUM_ARTISTS } from "../../redux/GPActionTypes";
import { fetchAllAlbumArtistsDtls, setGroupband } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { AlbumArtistThumb } from "../artist/AlbumArtistThumb";

export const AlbumArtistList = () => {
    const dispatch = useDispatch();
    let albumArtistsDetails = useSelector(state => state.library.albumArtistsDetails);
    if(albumArtistsDetails!==null && albumArtistsDetails!==undefined && albumArtistsDetails.length>0){
        albumArtistsDetails = albumArtistsDetails.sort((a, b)=>a.artistName > b.artistName?1:-1);
        albumArtistsDetails = albumArtistsDetails.sort((a, b)=>b.imgAvl?1:-1);
    }
    useEffect(()=>{
        dispatch(fetchAllAlbumArtistsDtls(ALBUM_ARTIST));
        dispatch(setGroupband("album_artists"));
        dispatch(setPlayedFrom(ALBUM_ARTISTS));
    },[]);
    return(
        <div className="album-artists-list">
            {albumArtistsDetails!==null && albumArtistsDetails!==undefined && albumArtistsDetails.length>0 && albumArtistsDetails.map((albumArtist, index) =>
                    <AlbumArtistThumb albumArtist={albumArtist} key={index} />
                )}
        </div>
    );
}