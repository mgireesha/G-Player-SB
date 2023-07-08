import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreDetails } from "../../redux/library/LibraryActions";
import { Link } from "react-router-dom";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { TRACKS_LABEL } from "../../redux/GPActionTypes";

export const Genres = () => {
    const dispatch = useDispatch();

    const genreDetails = useSelector(state => state.library.genreDetails);

    const [genreAlbums, setGenreAlbums] = useState({});
    const [genres, setGenres] = useState([]);
    const [genreSongCount, setGenreSongCount] = useState({});

    useEffect(()=>{
        dispatch(fetchGenreDetails());
    },[]);

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

    return(
        <div className="genres">
            <div className="genre-list">
                {genres.length > 0 && genres.map(genre =>
                    <div className="genre-thumb">
                        <div className="genre-thumb-img-div">
                            <Link to={`/music/genres/${genre}`}>
                                <GroupedThumbImg4 albumNames={genreAlbums[genre]} classPrefix="genre" />
                            </Link>
                        </div>
                        <div className="genre-thumb-details">
                            <Link to={`/music/genres/${genre}`}>
                                <label>{genre}</label>
                                <br />
                                <label>{genreSongCount[genre]}&nbsp;{TRACKS_LABEL}</label>
                            </Link>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    );
}