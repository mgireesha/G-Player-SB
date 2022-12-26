import React from "react";
import { Link } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';

export const AlbumArtistThumb = ({albumArtist, albumArtistsImgsDetails}) => {
    const artistImg = albumArtistsImgsDetails.find(albumArtistsImgsDetail => albumArtistsImgsDetail.albumArtistName === albumArtist);
    return(
        <div className="album-artist-thumb">
            <div className="album-artist-thumb-img-div">
            <Link to={`/music/album_artists/${albumArtist}`}>
                {artistImg===undefined && <img src={def_album_art} />}
                {artistImg!==undefined && <img src={"/images/album_artists/"+artistImg.albumArtistName+".jpg"} />}
            </Link>
            </div>
            <div className="album-artist-thumb-details">
                <label>{albumArtist}</label>
            </div>
        </div>
    )
}