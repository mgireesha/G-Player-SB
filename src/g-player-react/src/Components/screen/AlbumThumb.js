import React from "react";
import def_album_art from '../images/def_album_art.png';
import {MdOpenInFull} from "react-icons/md";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { ALBUM } from "../redux/GPActionTypes";
import { useDispatch } from "react-redux";
import { setContextObj, setShowContextMenu } from "../redux/library/LibraryActions";

export const AlbumThumb = ({album}) => {
    const dispatch = useDispatch();
    const showCOntextMenu = (event) => {
        console.log(event.target.getBoundingClientRect());
        const position = event.target.getBoundingClientRect();
        const width = document.getElementsByClassName("album-thumb-img-div")[0].firstChild.firstChild.offsetWidth;
        position.width = width;
        const contextObj = {
            position,
            type: ALBUM,
            obj: album
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
                <div className="album-menu-btn-div">
                    <div id="album_menu_btn_circle" className="album-menu-btn-circle" onClick={(event)=>showCOntextMenu(event)}>
                        <div className="album-menu-btn">
                            <HiOutlineDotsHorizontal  />
                        </div>
                    </div>
                </div>
                
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