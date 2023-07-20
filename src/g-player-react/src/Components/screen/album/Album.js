import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';
import { ALBUM, CURRENT_PAGE, MULTI_GENRE, TRACKS_LABEL } from ".././../redux/GPActionTypes";
import { Lyrics } from "../lyrics/Lyrics";
import { Track } from "../track/Track";
import { fetchAlbum, fetchAlbumTacks } from "../../redux/library/LibraryActions";
import { setCookies } from "../../utli";

export const Album = () => {
    const dispatch = useDispatch();
    const { albumName, genre } = useParams();
    const album = useSelector(state => state.library.album);
    let albumTracks = useSelector(state => state.library.albumTracks);
    if(albumTracks.length>0){
        albumTracks = albumTracks.sort((a,b) => a.trackNumber - b.trackNumber);
    }
    useEffect(()=>{
        dispatch(fetchAlbumTacks(albumName, genre));
        dispatch(fetchAlbum(albumName));
        setCookies(CURRENT_PAGE, JSON.stringify({type:ALBUM}));
    },[albumName, genre]);

    return(
        <div className="album">
            {album["albumName"]!==undefined && <div className="album-img-div-container">
                <div className="album-img-div">
                    {album.albumImgAvl && <img src={"/gp_images/albums/"+album.albumName+".jpg"} />}
                    {!album.albumImgAvl && <img src={def_album_art} />}
                </div>
                    <div className="album-details">
                        <h3>{album.albumName}</h3>
                        <Link to={`/music/album_artists/${album.albumArtist}`} >
                            <label style={{cursor:'pointer'}}>{album.albumArtist}</label>
                        </Link>
                        {album.genreType !== MULTI_GENRE &&<label>{album.year} - {album.genre}</label>}
                        {albumTracks && <label>{albumTracks.length}&nbsp;{TRACKS_LABEL}</label> }
                        {album.genreType === MULTI_GENRE &&
                            <>
                                <label>{album.year} - {genre?genre:"All"}</label>
                                <div className="album-multi-genre-select">
                                    <Link className={!genre?"selected":""} to={`/music/albums/${album.albumName}`}>All</Link>
                                    {album.genres.split(",").map(gnre=>
                                        <Link className={genre === gnre ? "selected":""} to={`/music/albums/${album.albumName}/${gnre}`}>{gnre}</Link>
                                    )}
                                </div>
                            </>
                        }
                    </div>
                <div className="album-lyrics">
                    <Lyrics />
                </div>
            </div>}
            <div className="album-track-list">
                {albumTracks.length>0 && albumTracks.map((track, index)=>
                    track.title!==null && <Track track={track} key={index} playedFrom={{pfKey:ALBUM, pfVal:albumName}} index={index}  />
                )}
            </div>
        </div>
    );
}