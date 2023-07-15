import React, { useEffect, useState } from "react";
import def_album_art from '../../images/def_album_art.png';
import {MdOpenInFull} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ALBUM, ARTIST, GENRE_TYPE_BTN, MULTI_GENRE } from "../../redux/GPActionTypes";
import { ThumbnailActionBtn } from "../../ThumbnailActionBtn";
import { RxDragHandleDots2 } from "react-icons/rx";
import { GPSelector } from "../../utilities/GPSelector";

export const AlbumThumb = ({album}) => {
    const navigate = useNavigate();
    const [gpSelectorOptions, setGpSelectorOptions] = useState([]);

    const [showGpSelector, setShowGpSelector] = useState(false);

    useEffect(()=>{
        if(album.genreType === MULTI_GENRE){
            let options = [];
            const genres = album.genres.split(",");
            genres.forEach(genre => {
                options.push({
                    label:genre,
                    callbackFunc: navigateToGenre,
                    args:{genre}
                });
            });
            setGpSelectorOptions(options);
        }else{
            setGpSelectorOptions([]);
        }
    },[album]);

    const navigateToGenre = (args) => {
        navigate(`/music/albums/${album.albumName}/${args.genre}`);
    }

    return(
        <div className="album-thumb">
            <div className="album-thumb-img-div">
                <Link to={`/music/albums/${album.albumName}`}>
                    {album.albumImgAvl && <img src={"/gp_images/albums/"+album.albumName+".jpg"} />}
                    {!album.albumImgAvl && <img src={def_album_art} />}
                </Link>
                {album.genreType === MULTI_GENRE &&
                    <>
                        <div id={GENRE_TYPE_BTN} className="genre-type-btn" onClick={()=>setShowGpSelector(true)}>
                            <RxDragHandleDots2 />
                        </div>
                        {showGpSelector && 
                            <GPSelector classPrefix="genre" options={gpSelectorOptions} 
                                        showGpSelector={showGpSelector}
                                        onSetShowGpSelector={setShowGpSelector}
                                        />
                        }
                    </>
                }
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