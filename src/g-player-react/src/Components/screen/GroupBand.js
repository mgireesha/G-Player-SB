import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const GroupBand = () => {
    const groupBand = useSelector(state => state.library.groupBand);
    return(
        <div className="group-band">
            <div className={groupBand==="tracks"?"traks-band group-band-highlight":"traks-band"}>
                <Link to="/music/tracks"><h3>Tracks</h3></Link>
            </div>
            <div className={groupBand==="albums"?"albums-band group-band-highlight":"albums-band"}>
                <Link to="/music/albums"><h3>Albums</h3></Link>
            </div>
            <div className={groupBand==="artists"?"artists-band group-band-highlight":"artists-band"}>
                <Link to="/music/artists"><h3>Artists</h3></Link>
            </div>
            <div className={groupBand==="album_artists"?"album_artists-band group-band-highlight":"album_artists-band"}>
                <Link to="/music/album_artists"><h3>Album Artists</h3></Link>
            </div>
        </div>
    );
}