import React from "react";
import { Link } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';

export const ArtistThumb = ({artist, artistsImgsDetails}) => {
    //const artistImg = artistsImgsDetails.find(artistsImgsDetail => artistsImgsDetail.artistName === artist.artistName);
    return(
        <div className="artist-thumb">
            <div className="artist-thumb-img-div">
            <Link to={`/music/artists/${artist.artistName}`}>
                {!artist.imgAvl && <img src={def_album_art} />}
                {artist.imgAvl && <img src={"/images/artists/"+artist.artistName+".jpg"} />}
            </Link>
            </div>
            <div className="artist-thumb-details">
                <label>{artist.artistName}</label>
            </div>
        </div>
    )
}