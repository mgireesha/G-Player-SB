import React, { useEffect, useState } from "react";
import def_album_art from '../images/def_album_art.png';

export const PlaylistImg = ({albumNames}) => {
    const [albumNameList, setAlbumNameList] = useState([]);

    useEffect(()=>{
        if(albumNames && albumNames.length > 0){
            const tempAlbumNameList = albumNames.slice(0,4);
            setAlbumNameList(tempAlbumNameList);
        }else{
            setAlbumNameList([]);
        }
    },[albumNames])
    return (
        <div className="playlist-img-container">
            {albumNameList.length > 0 &&
                <div className="playlist-img">
                    {albumNameList.map((albumName, i) =>
                        <img src={`/gp_images/albums/${albumName}.jpg`} key={i} />
                    )}
                </div>
            }
            {albumNameList.length === 0 &&
                <div className="playlist-no-img">
                    <img src={def_album_art} />
                </div>
            }
        </div>
    );
}