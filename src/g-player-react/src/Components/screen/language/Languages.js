import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreDetails, fetchLanguageDetails } from "../../redux/library/LibraryActions";
import { Link } from "react-router-dom";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { CURRENT_PAGE, LANGUAGES, LANGUAGE_LABEL, TRACKS_LABEL } from "../../redux/GPActionTypes";
import { ThumbnailActionBtn } from "../../ThumbnailActionBtn";
import { camelize, setCookies } from "../../utilities/util";

export const Languages = () => {
    const dispatch = useDispatch();

    const languageDetails = useSelector(state => state.library.languageDetails);

    const [languageAlbums, setGenreAlbums] = useState({});
    const [languages, setGenres] = useState([]);
    const [languageSongCount, setGenreSongCount] = useState({});

    useEffect(()=>{
        if(!languageDetails || (languageDetails && !languageDetails.LANGUAGE_SONG_COUNT)){
            dispatch(fetchLanguageDetails());
        }
        setCookies(CURRENT_PAGE, JSON.stringify({type:LANGUAGES}));
    },[]);

    useEffect(()=>{
        if(languageDetails){
            if(languageDetails.LANGUAGE_ALBUMS){
                setGenreAlbums(languageDetails.LANGUAGE_ALBUMS);
            }
            if(languageDetails.LANGUAGES){
                setGenres(languageDetails.LANGUAGES);
            }
            if(languageDetails.LANGUAGE_SONG_COUNT){
                setGenreSongCount(languageDetails.LANGUAGE_SONG_COUNT);
            }
        }
    },[languageDetails]);

    return(
        <div className="languages">
            <div className="language-list">
                {languages.length > 0 && languages.map(language =>
                    <div className="language-thumb">
                        <div className="language-thumb-img-div">
                            <Link to={`/music/languages/${language}`}>
                                <GroupedThumbImg4 albumNames={languageAlbums[language]} classPrefix="language" />
                            </Link>
                            <ThumbnailActionBtn rowList={[]} options={[{label:LANGUAGE_LABEL, link: `/music/languages/${language}`}]} />
                        </div>
                        <div className="language-thumb-details">
                            <Link to={`/music/languages/${language}`}>
                                <label>{camelize(language)}</label>
                                <br />
                                <label>{languageSongCount[language]}&nbsp;{TRACKS_LABEL}</label>
                            </Link>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    );
}