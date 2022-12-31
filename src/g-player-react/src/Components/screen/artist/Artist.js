import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ARTIST } from "../../redux/GPActionTypes";
import { fetchAllArtistsDtls, fetchSongsByArtist, setGroupband } from "../../redux/library/LibraryActions";
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { Track } from "../Track";
import def_album_art from '../../images/def_album_art.png';
import { scrolltoId } from "../..//utli";

export const Artist = () => {
    const dispatch = useDispatch();
    const { artist } = useParams();
    const artistsDetails = useSelector(state => state.library.artistsDetails);
    //const artistObj = artistsDetails.find(artistObj => artistObj.artistName===artist);
    const artistTracks = useSelector(state => state.library.artistTracks);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const isPlaying = useSelector(state => state.player.isPlaying);
    const [artistWiki, setArtistWiki] = useState({});
    const [artistWikiImg, setArtistWikiImg] = useState(null);
    const [artistObj, setArtistObj] = useState({});
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
        dispatch(setGroupband("artists"));
        dispatch(setPlayedFrom(ARTIST));
        //scrollToPlaying();
    },[]);
    const fetchArtistDetailsfromWiki =async(artist) => {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${artist}`);
        const data = await response.json();
        if(data['extract']!==undefined && (data['extract'].toLowerCase().includes('singer')
            || data['extract'].toLowerCase().includes('actor')) && !data['extract'].toLowerCase().includes('may refer to')){
            setArtistWiki(data);
            if(data["thumbnail"]!==undefined){
                setArtistWikiImg(data.thumbnail.source);
            }
        }
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
            <div className="artist-track-list">
                {artistTracks!==null && artistTracks!==undefined && artistTracks.map((track, index)=>
                    track.title!==null && <Track track={track} key={track.songId} playedFrom={ARTIST} index={index} />
                )}
            </div>
        </div>
    );
}