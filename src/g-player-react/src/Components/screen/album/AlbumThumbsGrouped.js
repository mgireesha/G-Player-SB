import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlbumThumb } from "../AlbumThumb";
import def_album_art from '../../images/def_album_art.png';

export const AlbumThumbsGrouped = ({albums}) => {
    const [albumArr, setAlbumArr] = useState([]);
    useEffect(()=>{
        const tempAlbumArr = albums;//.splice(0, 6);
        setAlbumArr(tempAlbumArr);
    },[albums])
    return(
        <div className="album-thumbs-grouped">
            {albumArr.length>0 && albumArr.map((album, index)=>
                <>
                    <div className="album-thumb-img-div">
                        <Link to={`/music/albums/${album.albumName}`}>
                            {album.albumImgAvl && <img src={"/images/albums/" + album.albumName + ".jpg"} />}
                            {!album.albumImgAvl && <img src={def_album_art} />}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}