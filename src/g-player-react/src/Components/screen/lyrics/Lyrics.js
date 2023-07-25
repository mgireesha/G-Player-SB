import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLyrics } from "../../redux/player/PlayerActions";
import { getMins0 } from "../../utilities/util";
import {  FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PLAYER_UPDATE_LYRICS_SUCCESS } from "../../redux/player/PlayerActionTypes";
import { CreateLyrics } from "./CreateLyrics";

export const Lyrics = () => {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playingSongStat = useSelector(state => state.player.playingSongStat);
    const phase = useSelector(state => state.player.phase);
    const [linePlaying, setLinePlaying] = useState("");
    const [nextLine, setNextLine] = useState("");
    const [previousLine, setPreviousLine] = useState("");
    const [lyricsObj, setLyricsObj] = useState(null);
    const [lyricsObjKeys, setLyricsObjKeys] = useState(null);
    const [showEditLyrics, setShowEditLyrics] = useState(false);
    const [showCreateLyrics, setShowCreateLyrics] = useState(false);
    const [isCreateLyricsStarted, setisCreateLyricsStarted] = useState(false);
    const [lyrics, setLyrics] = useState(null);
    
    useEffect(()=>{
        setLinePlaying(null);setLyricsObj(null);setNextLine(null);setPreviousLine(null);
        if(songPlaying!==null)setLyrics(songPlaying.lyrics);
    },[songPlaying]);

    useEffect(()=>{
        getLyrics(lyrics)
    },[lyrics])
    
    useEffect(()=>{
        if(lyricsObj!==null && lyricsObj!==undefined){
            try {
                const currentTime = Math.floor(parseInt(playingSongStat.currentTime)/1000);
                const tempLine = lyricsObj[getMins0(currentTime).toString()];
                if(tempLine!==null && tempLine!==undefined && tempLine!==""){
                    setLinePlaying(tempLine);
                    const lineIndex = lyricsObjKeys.findIndex(key => key===getMins0(currentTime).toString());
                    setNextLine(lyricsObj[lyricsObjKeys[lineIndex+1]]);
                    setPreviousLine(lyricsObj[lyricsObjKeys[lineIndex-1]]);
                }
            } catch (error) {
                console.log("Error in lyrics component: ",error);
            }
        }
    },[playingSongStat]);

    const getLyrics =(lyrics) => {
        if(lyrics===null || lyrics===undefined)return null;
        let time;
        let text;
        const tempLyricObj = {};
        let timeArr;
        if(lyrics!==null && lyrics!==undefined){
            const lyricsArr = lyrics.split("\n");
            lyricsArr.forEach(line => {
                time = line.substring(line.indexOf('[')+1,6);
                timeArr = time.split(":");
                if(!isNaN(timeArr[0])){
                    //time = time.substring(0,time.length-3);
                    text = line.substring(line.indexOf(']')+1,line.length);
                    tempLyricObj[time] = text;
                }
            });
        }
        setLyricsObjKeys(Object.keys(tempLyricObj));
        setLyricsObj(tempLyricObj);
    }

    const initUpdateLyrics = () =>{
        const lyrics = document.getElementById('new_lyrics_ta').value;
        if(lyrics==="" || lyrics===null){
            alert("Please paste lyrics");
            return false;
        }
        dispatch(updateLyrics(songPlaying.songId, lyrics));
    }

    const initEditLyrics = () => {
        document.getElementById('new_lyrics_ta').value = songPlaying.lyrics;
        setShowEditLyrics(true);

    }

    useEffect(()=>{
        if(phase===PLAYER_UPDATE_LYRICS_SUCCESS){
            setShowEditLyrics(false);
            setisCreateLyricsStarted(false);
            setShowCreateLyrics(false);
        }
    },[phase]);

    const startCreateLyrics = () => {
        const newLyrics = document.getElementById('new_lyrics_ta').value;
        if(newLyrics==="" || newLyrics===null){
            alert("Please paste lyrics");
            return false;
        }
        setLyrics(newLyrics);
        setisCreateLyricsStarted(true);
    }

    const onSetisCreateLyricsStarted = (value)=>{
        setisCreateLyricsStarted(value);
        if(!value){
            setShowCreateLyrics(false);
            setLyrics(null);
            setShowEditLyrics(false);
            setLyricsObj(null);
        }
    }
    
    return(
    <div className="lyrics">
    {!isCreateLyricsStarted && <div className="show-lyrics">
        {songPlaying && !showEditLyrics && !showCreateLyrics && 
            <Link to={`/music/albums/${songPlaying.album}`}><label className="show-lyrics-song-title"><FaPlay /> {songPlaying.title} from&nbsp;{songPlaying.album}</label></Link>
        }
        {lyricsObj!==null && !showEditLyrics &&
        <>
            <label>{previousLine}</label>
            <label className="text-highlighted-y" id={linePlaying}>{linePlaying}</label>
            <label>{nextLine}</label>
        </>
        }
            <div style={{display:'flex', flexDirection:'column', rowGap:10}}>
                {lyricsObj===null && !showEditLyrics && !showCreateLyrics && <label>Lyrics not found for the song playing.</label>}
                <textarea cols="60" rows="8" id="new_lyrics_ta" style={{display:showEditLyrics || showCreateLyrics?'block':'none'}}></textarea>
            </div>

        <div className="show-lyrics-btn-container">
            {!showEditLyrics && lyricsObj===null && !showCreateLyrics &&
                <>
                    <a onClick={()=>setShowEditLyrics(true)} className="lyrics-btn lyrics-btn-add">Add lyrics</a>
                    <a onClick={()=>{setShowCreateLyrics(true)}} className="lyrics-btn lyrics-btn-add">Create lyrics</a>
                </>
            }
            { showEditLyrics && 
                <>
                    <a onClick={initUpdateLyrics} className="lyrics-btn lyrics-btn-add">Save</a>
                </>
            }
            { showCreateLyrics && 
                <>
                    <a onClick={startCreateLyrics} className="lyrics-btn lyrics-btn-add">Start</a>
                </>
            }
            { (showEditLyrics || showCreateLyrics) && 
                <>
                    <a onClick={()=>{setShowEditLyrics(false);setShowCreateLyrics(false)}} className="lyrics-btn lyrics-btn-cancel">Cancel</a>
                </>
            }

            {lyricsObj!==null && !showEditLyrics && 
                <a onClick={initEditLyrics} className="lyrics-btn lyrics-btn-add">Edit lyrics</a>
            }
        </div>
        {songPlaying!==null &&  songPlaying.lyricist!==null && 
            <div className="lyrics-written-by-div">
                <span>Lyricist: {songPlaying.lyricist}</span>
            </div>
        }
    </div>}
    {isCreateLyricsStarted && 
        <div className="show-lyrics" style={{width:'100%'}}>
            <CreateLyrics onSetisCreateLyricsStarted={onSetisCreateLyricsStarted} newLyrics={lyrics} />
        </div>
    }
    </div>
    );

}