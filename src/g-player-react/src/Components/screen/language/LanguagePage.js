import React, { useEffect, useState } from "react";
import { GroupedThumbImg4 } from "../../GroupedThumbImg4";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, LANGUAGE, LYRICS_AVAILABLE, PLAY_ALL_LABEL, SORT_ARTIST, SORT_YEAR, TRACKS_LABEL, TRACK_LIST } from "../../redux/GPActionTypes";
import { fetchGenreDetails, fetchLanguageDetails, fetchSongsByGenre, fetchSongsByLanguage } from "../../redux/library/LibraryActions";
import { TrackList } from "../track/TrackList";
import { FaPlay } from "react-icons/fa";
import { Lyrics } from "../lyrics/Lyrics";
import { camelize, setCookies } from "../../utilities/util";

export const LanguagePage = () => {
    const {language} = useParams();

    const dispatch = useDispatch();
    
    const languageDetails = useSelector(state => state.library.languageDetails);
    let languageSongList = useSelector(state => state.library.languageSongList);
    if(languageSongList.length>0){
        languageSongList = languageSongList.sort((a,b)=>{return a.title>b.title?1:-1});
    }

    const [languageAlbums, setGenreAlbums] = useState({});
    const [languageSongCount, setGenreSongCount] = useState({});
    const [trackListInp, setTrackListInp] = useState({});

    useEffect(()=>{
        dispatch(fetchSongsByLanguage(language));
        if(!languageDetails || (languageDetails && !languageDetails.LANGUAGE_SONG_COUNT)){
            dispatch(fetchLanguageDetails());
        }
        setCookies(CURRENT_PAGE, JSON.stringify({type:LANGUAGE}));
    },[language]);

    useEffect(()=>{
        if(languageDetails){
            if(languageDetails.LANGUAGE_ALBUMS){
                setGenreAlbums(languageDetails.LANGUAGE_ALBUMS);
            }
            if(languageDetails.LANGUAGE_SONG_COUNT){
                setGenreSongCount(languageDetails.LANGUAGE_SONG_COUNT);
            }
        }
    },[languageDetails]);

    useEffect(()=>{
        const tempTrackListInp = {
            playedFrom:{
                pfKey:LANGUAGE, 
                pfVal:language
            },
            showSort: false,
            showLKey: false,
            sortSelectors:[A_TO_Z,A_TO_Z_DESC, SORT_YEAR, SORT_ARTIST, LYRICS_AVAILABLE],
            selectedSortBy:A_TO_Z
        }

        if(languageSongList){
            if(languageSongList.length > 6){
                tempTrackListInp.showSort = true;
                tempTrackListInp.traskListStyle = {
                    maxHeight : 'calc(100vh - 29em)'
                }
            }
            if(languageSongList.length > 20){
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
    },[languageSongList]);

    const playAll = () => {
        const tracks = document.getElementById(TRACK_LIST);
        if(tracks && tracks.childElementCount > 0){
            tracks.getElementsByClassName("track")[0].children[0].click()
        }
    }

    return(
        <div className="language-page">
            <div className="language-page-header">
                <GroupedThumbImg4 albumNames={languageAlbums[language]} classPrefix="language" />
                <div className="language-details">
                    <div className="language-name">
                        <h2>{camelize(language)}</h2>
                        <label>{languageSongCount[language]}&nbsp;{TRACKS_LABEL}</label>
                    </div>
                    <div className="language-actions">
                        <div className="play-all">
                            <button onClick={playAll} ><FaPlay className="faplay"  />{PLAY_ALL_LABEL}</button>
                        </div>
                    </div>
                </div>
                <div className="language-lyrics">
                    <Lyrics />
                </div>
            </div>
            {languageSongList.length > 0 && trackListInp.playedFrom &&
                <TrackList tracks={languageSongList} trackListInp={trackListInp} />
            }
            
        </div>
    );
}