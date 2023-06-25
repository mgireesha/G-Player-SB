import React from "react";
import def_album_art from '../images/def_album_art.png';

export const PlaylistImg = ({albumNames}) => {
    return (
        <div className="playlist-img-container">
            {albumNames.length > 0 &&
                <div className="playlist-img">
                    {albumNames.map(albumName =>
                        <img src={`/gp_images/albums/${albumName}.jpg`} />
                    )}
                </div>
            }
            {albumNames.length === 0 &&
                <div className="playlist-no-img">
                    <img src={def_album_art} />
                </div>
            }
        </div>
    );
}