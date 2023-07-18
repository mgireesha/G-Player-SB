import React, { useEffect, useState } from "react";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GENRE, PLAY_ALL_LABEL, TRACKS_LABEL, TRACK_LIST } from "../../redux/GPActionTypes";
import { fetchGenreDetails, fetchSongsByGenre } from "../../redux/library/LibraryActions";
import { TrackList } from "../track/TrackList";
import { FaPlay } from "react-icons/fa";
import { Lyrics } from "../lyrics/Lyrics";

export const GenrePage = () => {
    const {genre} = useParams();

    const dispatch = useDispatch();
    
    const genreDetails = useSelector(state => state.library.genreDetails);
    let genreSongList = useSelector(state => state.library.genreSongList);
    if(genreSongList.length>0){
        genreSongList = genreSongList.sort((a,b)=>{return a.title>b.title?1:-1});
    }

    const [genreAlbums, setGenreAlbums] = useState({});
    const [genreSongCount, setGenreSongCount] = useState({});
    const [trackListInp, setTrackListInp] = useState({});

    useEffect(()=>{
        dispatch(fetchSongsByGenre(genre));
        if(!genreDetails || (genreDetails && !genreDetails.GENRE_SONG_COUNT)){
            dispatch(fetchGenreDetails());
        }
    },[genre]);

    useEffect(()=>{
        if(genreDetails){
            if(genreDetails.GENRE_ALBUMS){
                setGenreAlbums(genreDetails.GENRE_ALBUMS);
            }
            if(genreDetails.GENRE_SONG_COUNT){
                setGenreSongCount(genreDetails.GENRE_SONG_COUNT);
            }
        }
    },[genreDetails]);

    useEffect(()=>{
        const tempTrackListInp = {
            playedFrom:{
                pfKey:GENRE, 
                pfVal:genre
            },
            showSort: false,
            showLKey: false,
        }

        if(genreSongList){
            if(genreSongList.length > 6){
                tempTrackListInp.showSort = true;
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 29em)'
                }
            }
            if(genreSongList.length > 20){
                tempTrackListInp.showLKey = true;
                tempTrackListInp.lKeyStyle = {
                    position:'absolute', 
                    visibility:'hidden'
                }
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 31.8em)'
                }
            }
        }

        setTrackListInp(tempTrackListInp);
    },[genreSongList]);

    const playAll = () => {
        const tracks = document.getElementById(TRACK_LIST);
        if(tracks && tracks.childElementCount > 0){
            tracks.getElementsByClassName("track")[0].children[0].click()
        }
    }

    return(
        <div className="genre-page">
            <div className="genre-page-header">
                <GroupedThumbImg4 albumNames={genreAlbums[genre]} classPrefix="genre" />
                <div className="genre-details">
                    <div className="genre-name">
                        <h2>{genre}</h2>
                        <label>{genreSongCount[genre]}&nbsp;{TRACKS_LABEL}</label>
                    </div>
                    <div className="genre-actions">
                        <div className="play-all">
                            <button onClick={playAll} ><FaPlay className="faplay"  />{PLAY_ALL_LABEL}</button>
                        </div>
                    </div>
                </div>
                <div className="genre-lyrics">
                    <Lyrics />
                </div>
            </div>
            {genreSongList.length > 0 && trackListInp.playedFrom &&
                <TrackList tracks={genreSongList} trackListInp={trackListInp} />
            }
            
        </div>
    );
}