import React from "react";
import def_album_art from '../../images/def_album_art.png';
import {MdOpenInFull} from "react-icons/md";
import { Link } from "react-router-dom";
import { ALBUM, ARTIST } from "../../redux/GPActionTypes";
import { useDispatch } from "react-redux";
import { setContextObj, setShowContextMenu } from "../../redux/library/LibraryActions";
import { ThumbnailActionBtn } from "../../ThumbnailActionBtn";

export const AlbumThumb = ({album}) => {
    const dispatch = useDispatch();
    const showCOntextMenu = (event) => {
        const position = event.target.getBoundingClientRect();
        const width = document.getElementsByClassName("album-thumb-img-div")[0].firstChild.firstChild.offsetWidth;
        position.width = width;
        const contextObj = {
            position,
            type: ALBUM,
            obj: album,
            rowList: []
        }
        dispatch(setContextObj(contextObj));
        dispatch(setShowContextMenu(true));
    }
    return(
        <div className="album-thumb">
            <div className="album-thumb-img-div">
                <Link to={`/music/albums/${album.albumName}`}>
                    {album.albumImgAvl && <img src={"/gp_images/albums/"+album.albumName+".jpg"} />}
                    {!album.albumImgAvl && <img src={def_album_art} />}
                </Link>
                <Link to={`/music/albums/${album.album}`}>
                    <div className="album-thumb-img-div-link">
                        <MdOpenInFull />
                    </div>
                </Link>
                <ThumbnailActionBtn rowList={[ALBUM,ARTIST]} type={ALBUM} obj={album} />
            </div>
            <div className="album-thumb-details">
            <label>
                <Link to={`/music/albums/${album.albumName}`}>{album.albumName}</Link>
            </label>
                <p>
                    <Link to={`/music/album_artists/${album.albumArtist}`} >{album.albumArtist}</Link>
                </p>
            </div>
        </div>
    );
}