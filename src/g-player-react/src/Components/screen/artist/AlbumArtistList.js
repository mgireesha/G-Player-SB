import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALBUM_ARTISTS } from "../../redux/GPActionTypes";
import { fetchAllAlbumArtistsDtls, setGroupband } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { AlbumArtistThumb } from "../artist/AlbumArtistThumb";

export const AlbumArtistList = () => {
    const dispatch = useDispatch();
    let albumArtistsDetails = useSelector(state => state.library.albumArtistsDetails);
    if(albumArtistsDetails!==null && albumArtistsDetails!==undefined && albumArtistsDetails.length>0){
        albumArtistsDetails = albumArtistsDetails.sort();
    }
    const albumArtistsImgsDetails = useSelector(state => state.library.albumArtistsImgsDetails);
    useEffect(()=>{
        dispatch(fetchAllAlbumArtistsDtls());
        dispatch(setGroupband("album_artists"));
        dispatch(setPlayedFrom(ALBUM_ARTISTS));
    },[]);
    return(
        <div className="album-artists-list">
            {albumArtistsDetails!==null && albumArtistsDetails!==undefined && albumArtistsDetails.length>0 && albumArtistsDetails.map(albumArtist =>
                    <AlbumArtistThumb albumArtist={albumArtist} albumArtistsImgsDetails={albumArtistsImgsDetails} />
                )}
        </div>
    );
}