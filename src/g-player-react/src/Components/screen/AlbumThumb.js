import React from "react";
import def_album_art from '../images/def_album_art.png';
import {MdOpenInFull} from "react-icons/md";
import { Link } from "react-router-dom";

export const AlbumThumb = ({album, albumImg}) => {
    return(
        <div className="album-thumb">
            <div className="album-thumb-img-div">
                <Link to={`/music/albums/${album.album}`}>
                    {albumImg!==undefined && <img src={albumImg} />}
                    {albumImg===undefined && <img src={def_album_art} />}
                </Link>
                <Link to={`/music/albums/${album.album}`}>
                    <div className="album-thumb-img-div-link">
                        <MdOpenInFull />
                    </div>
                </Link>
            </div>
            <div className="album-thumb-details">
            <label>
                <Link to={`/music/albums/${album.album}`}>{album.album}</Link>
            </label>
                <p>
                    <Link to={`/music/album_artists/${album.albumArtist}`} >{album.albumArtist}</Link>
                </p>
            </div>
        </div>
    );
}