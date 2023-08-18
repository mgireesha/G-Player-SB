import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import def_album_art from '../../images/def_album_art.png';
import { ALBUM, A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, MULTI_GENRE, TRACKS_LABEL, TRACK_NUMBER } from ".././../redux/GPActionTypes";
import { Lyrics } from "../lyrics/Lyrics";
import { fetchAlbum, fetchAlbumTacks } from "../../redux/library/LibraryActions";
import { camelize, setCookies } from "../../utilities/util";
import { TrackList } from "../track/TrackList";
import { SplitAndLink } from "../../utilities/SplitAndLink";

export const Album = () => {
    const dispatch = useDispatch();
    const { albumName, genre } = useParams();
    const album = useSelector(state => state.library.album);
    let albumTracks = useSelector(state => state.library.albumTracks);
    if(albumTracks.length>0){
        albumTracks = albumTracks.sort((a,b) => a.trackNumber - b.trackNumber);
    }

    const [trackListInp, setTrackListInp] = useState({});

    useEffect(()=>{
        dispatch(fetchAlbumTacks(albumName, genre));
        dispatch(fetchAlbum(albumName));
        setCookies(CURRENT_PAGE, JSON.stringify({type:ALBUM}));
    },[albumName, genre]);

    useEffect(()=>{
        const tempTrackListInp = {
            playedFrom:{
                pfKey:ALBUM, 
                pfVal:albumName,
            },
            showSort: true,
            showLKey: false,
            sortSelectors:[TRACK_NUMBER,A_TO_Z,A_TO_Z_DESC],
            selectedSortBy:TRACK_NUMBER
        }

        if(albumTracks){
            if(albumTracks.length > 6){
                tempTrackListInp.showSort = true;
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 24.2em)'
                }
            }
        }

        setTrackListInp(tempTrackListInp);
    },[albumTracks]);

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
                        {album.genreType !== MULTI_GENRE &&<label>{album.year} - <SplitAndLink str={album.genre} url={`/music/genres/`} /></label>}
                        {albumTracks && <label>{albumTracks.length}&nbsp;{TRACKS_LABEL}</label> }
                        {album.genreType === MULTI_GENRE &&
                            <>
                                <label>{album.year} - {genre?<Link to={`/music/genres/${album.genre}`}>{camelize(genre)}</Link>:"All"}</label>
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
                <TrackList trackListInp={trackListInp} tracks={albumTracks}  />
            </div>
        </div>
    );
}