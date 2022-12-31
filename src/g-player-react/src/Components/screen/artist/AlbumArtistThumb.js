import React from "react";
import { Link } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';

export const AlbumArtistThumb = ({albumArtist}) => {
    return(
        <div className="album-artist-thumb">
            <div className="album-artist-thumb-img-div">
            <Link to={`/music/album_artists/${albumArtist.artistName}`}>
                {!albumArtist.imgAvl && <img src={def_album_art} />}
                {albumArtist.imgAvl && <img src={"/images/artists/"+albumArtist.artistName+".jpg"} />}
            </Link>
            </div>
            <div className="album-artist-thumb-details">
                <label><Link to={`/music/album_artists/${albumArtist.artistName}`}>{albumArtist.artistName}</Link></label>
            </div>
        </div>
    )
}