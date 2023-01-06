import React from "react";
import { Link } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';

export const ArtistThumb = ({artist}) => {
    return(
        <div className="artist-thumb">
            <div className="artist-thumb-img-div">
            <Link to={`/music/artists/${artist.artistName}`}>
                {!artist.imgAvl && <img src={def_album_art} />}
                {artist.imgAvl && <img src={"/images/artists/"+artist.artistName+".jpg"} />}
            </Link>
            </div>
            <div className="artist-thumb-details">
                <label><Link to={`/music/artists/${artist.artistName}`}>{artist.artistName}</Link></label>
                <label className="track-count">Tracks&nbsp;{artist.count}</label>
            </div>
        </div>
    )
}