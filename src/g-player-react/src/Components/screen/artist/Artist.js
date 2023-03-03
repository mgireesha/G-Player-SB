import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ARTIST, WIKI_SUMMARY_URL } from "../../redux/GPActionTypes";
import { fetchAllArtistsDtls, fetchSongsByArtist } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { Track } from "../Track";
import def_album_art from '../../images/def_album_art.png';
import { scrolltoId } from "../..//utli";
import { FilterComp } from "../../FilterComp";

export const Artist = () => {
    const dispatch = useDispatch();
    const { artist } = useParams();
    const artistsDetails = useSelector(state => state.library.artistsDetails);
    //const artistObj = artistsDetails.find(artistObj => artistObj.artistName===artist);
    let artistTracks = useSelector(state => state.library.artistTracks);
    if(artistTracks.length>0){
        artistTracks = artistTracks.sort((a,b)=>{return a.year>b.year?-1:1});
    }
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const isPlaying = useSelector(state => state.player.isPlaying);
    const [artistWiki, setArtistWiki] = useState({});
    const [artistWikiImg, setArtistWikiImg] = useState(null);
    const [artistObj, setArtistObj] = useState({});
    const [artistTracksL, setArtistTracksL] = useState([]);
    const [filterTxt, setFilterTxt] = useState(null);
    useEffect(()=>{
        setArtistWikiImg(null);
        setArtistWiki({});
        dispatch(fetchSongsByArtist(artist));
        fetchArtistDetailsfromWiki(artist);
    },[artist]);

    useEffect(()=>{
        if(artistsDetails.length>0){
            setArtistObj(artistsDetails.find(artistObj => artistObj.artistName===artist));
        }else{
            dispatch(fetchAllArtistsDtls(ARTIST));
        }
    },[artist, artistsDetails]);

    useEffect(()=>{
        setArtistTracksL(artistTracks);
    },[artistTracks]);

    useEffect(()=>{
        if(filterTxt===null){
            setArtistTracksL(artistTracks);
        }else if(filterTxt.length>2){
            let tempArtistTracks = [...artistTracks];
            tempArtistTracks = tempArtistTracks.filter(track => {return track.title.toLowerCase().includes(filterTxt) 
                                                                            || track.album.toLowerCase().includes(filterTxt) 
                                                                            || track.year===filterTxt 
                                                                            || track.genre.toLowerCase().includes(filterTxt)
                                                                    });
            if(tempArtistTracks.length>0){
                setArtistTracksL(tempArtistTracks);
            }else{
                setArtistTracksL([]);
            }
        }
    },[filterTxt]);

    const onSetFilterTxt = (event) => {
        const tempFilterTxt = event.target.value;
        if(tempFilterTxt==="" || tempFilterTxt.length<3){
            setFilterTxt(null);
        }else if(tempFilterTxt.length>2){
            setFilterTxt(tempFilterTxt.toLowerCase());
        }
    }

    useEffect(()=>{
        //dispatch(setGroupband("artists"));
        //dispatch(setPlayedFrom(ARTIST));
        //dispatch(setPlayedFrom({pfKey:ARTIST, pfVal:artist}));
        //scrollToPlaying();
    },[]);
    const fetchArtistDetailsfromWiki =async(artist) => {
        let searchedSingerActor = false;
        let data = await callWikiAPI(`${WIKI_SUMMARY_URL}${artist}`);
        // if(data['extract']!==undefined && (data['extract'].toLowerCase().includes('singer')
        //     || data['extract'].toLowerCase().includes('actor')) && !data['extract'].toLowerCase().includes('may refer to')){
        //     setArtistWiki(data);
        //     if(data["thumbnail"]!==undefined){
        //         setArtistWikiImg(data.thumbnail.source);
        //     }
        // }
        if(data.title.includes("Not Found") || data.title.includes("doesn't exist") || data.extract.includes("may refer to")){
            data = await callWikiAPI(`${WIKI_SUMMARY_URL}${artist}_(singer)`);
            if(data.title.includes("Not Found") || data.title.includes("doesn't exist")){
                data = await callWikiAPI(`${WIKI_SUMMARY_URL}${artist}_(actor)`);
                searchedSingerActor = true;
            }
        }
        if(!(data.extract.includes("singer") || data.extract.includes("director")
                        || data.extract.includes("actress") || data.extract.includes("actor")
                        || data.extract.includes("composer") || data.extract.includes("musician")
                        )){
            if(!searchedSingerActor){
                data = await callWikiAPI(`${WIKI_SUMMARY_URL}${artist}_(singer)`);
                if(data.title.includes("Not Found") || data.title.includes("doesn't exist")){
                    data = await callWikiAPI(`${WIKI_SUMMARY_URL}${artist}_(actor)`);
                }
            }else{
                data = null;
            }
        }
        console.log("data", data);
        setArtistWiki(data);
        if(data["thumbnail"]!==undefined){
            setArtistWikiImg(data.thumbnail.source);
        }
    }

    const callWikiAPI = async(wikiURL) => {
        const response = await fetch(wikiURL);
        const data = await response.json();
        return data;
    }

    const scrollToPlaying = ()=>{
        if(isPlaying){
            const trackPlaying = document.getElementsByClassName("text-highlighted-y");
            if(trackPlaying.length>0){
             scrolltoId(trackPlaying[0].id);   
            }
        }
    }
    return(
        <div className="artist">
            <div className="artist-img-div-container">
                <div className="artist-img-div">
                    {artistObj.imgAvl  && <img src={"/images/artists/"+artistObj.artistName+".jpg"} />}
                    {!artistObj.imgAvl && artistWikiImg!==null && <img src={artistWikiImg} />}
                    {!artistObj.imgAvl && artistWikiImg===null && <img src={def_album_art} />}
                </div>
                <div className="artist-details">
                    <h3>{artist}</h3>
                    {artistTracks!==undefined && artistTracks!==null &&
                        <label>Tracks: {artistTracks.length}</label>
                    }
                    {playedFrom===ARTIST && songPlaying!==undefined && songPlaying!==null && songPlaying.artist.includes(artist) &&
                        <label>Playing:&nbsp;<i onClick={scrollToPlaying} style={{cursor:'pointer',color:'#ef6464'}}>{songPlaying.title}</i>&nbsp;<Link to={`/music/albums/${songPlaying.album}`}>{songPlaying.album!==null?'from '+songPlaying.album:''}</Link></label>
                    }
                    {artistWiki !==null && artistWiki!==undefined && artistWiki["extract"]!==undefined && 
                        <div className="artist-wiki-summary">
                            <p>{artistWiki["extract"]}</p>
                        </div>
                    }
                </div>
            </div>
            <div style={{width:'100%'}}>
                <FilterComp onSetFilterTxt={onSetFilterTxt} />
            </div>
            
            <div className="artist-track-list">
                {artistTracksL!==null && artistTracksL!==undefined && artistTracksL.map((track, index)=>
                    track.title!==null && <Track track={track} key={track.songId} playedFrom={{pfKey:ARTIST, pfVal:artist}} index={index} />
                )}
            </div>
        </div>
    );
}