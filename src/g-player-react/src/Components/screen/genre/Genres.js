import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreDetails } from "../../redux/library/LibraryActions";
import { Link } from "react-router-dom";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { GENRE_LABEL, TRACKS_LABEL } from "../../redux/GPActionTypes";
import { ThumbnailActionBtn } from "../../ThumbnailActionBtn";

export const Genres = () => {
    const dispatch = useDispatch();

    const genreDetails = useSelector(state => state.library.genreDetails);

    const [genreAlbums, setGenreAlbums] = useState({});
    const [genres, setGenres] = useState([]);
    const [genreSongCount, setGenreSongCount] = useState({});

    useEffect(()=>{
        if(!genreDetails || (genreDetails && !genreDetails.GENRE_SONG_COUNT)){
            dispatch(fetchGenreDetails());
        }
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
                            <ThumbnailActionBtn rowList={[]} options={[{label:GENRE_LABEL, link: `/music/genres/${genre}`}]} />
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