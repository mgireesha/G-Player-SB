import React from "react";
import { Link } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';

export const ArtistThumb = ({artist, artistsImgsDetails}) => {
    const artistImg = artistsImgsDetails.find(artistsImgsDetail => artistsImgsDetail.artistName === artist);
    return(
        <div className="artist-thumb">
            <div className="artist-thumb-img-div">
            <Link to={`/music/artists/${artist}`}>
                {artistImg===undefined && <img src={def_album_art} />}
                {artistImg!==undefined && <img src={"/images/artists/"+artistImg.artistName+".jpg"} />}
            </Link>
            </div>
            <div className="artist-thumb-details">
                <label>{artist}</label>
            </div>
        </div>
    )
}