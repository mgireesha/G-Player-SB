import React, { useEffect, useState } from "react";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GENRE, TRACKS_LABEL } from "../../redux/GPActionTypes";
import { fetchSongsByGenre } from "../../redux/library/LibraryActions";
import { TrackList } from "../track/TrackList";

export const GenrePage = () => {
    const {genre} = useParams();

    const dispatch = useDispatch();
    
    const genreDetails = useSelector(state => state.library.genreDetails);
    const genreSongList = useSelector(state => state.library.genreSongList);

    const [genreAlbums, setGenreAlbums] = useState({});
    const [genres, setGenres] = useState([]);
    const [genreSongCount, setGenreSongCount] = useState({});
    const [trackListInp, setTrackListInp] = useState({});

    useEffect(()=>{
        dispatch(fetchSongsByGenre(genre));
    },[genre]);

    useEffect(()=>{
        if(genreDetails){
            if(genreDetails.GENRE_ALBUMS){
                setGenreAlbums(genreDetails.GENRE_ALBUMS);
            }
            if(genreDetails.GENRES){
                setGenres(genreDetails.GENRES);
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
                    maxHeight : 'calc(100vh - 26.3em)'
                }
            }
            if(genreSongList.length > 20){
                tempTrackListInp.showLKey = true;
                tempTrackListInp.lKeyStyle = {
                    position:'absolute', 
                    visibility:'hidden'
                }
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 28.8em)'
                }
            }
        }

        setTrackListInp(tempTrackListInp);
    },[genreSongList]);

    return(
        <div className="genre-page">
            <div className="genre-page-header">
                <GroupedThumbImg4 albumNames={genreAlbums[genre]} classPrefix="genre" />
                <div className="genre-details">
                    <div className="genre-name">
                        <h2>{genre}</h2>
                        <label>{genreSongCount[genre]}&nbsp;{TRACKS_LABEL}</label>
                    </div>
                </div>
            </div>
            {genreSongList.length > 0 && trackListInp.playedFrom &&
                <TrackList tracks={genreSongList} trackListInp={trackListInp} />
            }
            
        </div>
    );
}