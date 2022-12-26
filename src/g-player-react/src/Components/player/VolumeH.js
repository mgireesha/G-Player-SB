import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMediaVolume } from "../redux/player/PlayerActions";

import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from "react-icons/hi2";

export const VolumeH = () => {
    const dispatch = useDispatch();
    const currentVolume = useSelector(state => state.player.currentVolume);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const [currentVolVal, setCurrentVolVal] = useState(70);
    const [tempVolVal, setTempVolVal] = useState(0);
    const [isMute,setIsMute] = useState(false);

    useEffect(()=>{
        let volume = currentVolume * 100;
        setCurrentVolVal(volume);
    },[currentVolume]);

    useEffect(()=>{
        if(songPlaying!==null){
            setCurrentVolVal(20);
            dispatch(setMediaVolume(0.6));
        }
    },[songPlaying]);

    useEffect(()=>{
        let isMute1 = false;
        if(parseInt(currentVolVal)===0){
            isMute1 = true;
        }
        setIsMute(isMute1); 
    },[currentVolVal]);

    const updateMediaVolume = (event) => {
        const value = event.target.value;
        setCurrentVolVal(value);
        dispatch(setMediaVolume(value/100));
    }

    const muteMedia = (mute) => {
        if(mute){
            setTempVolVal(currentVolVal);
            dispatch(setMediaVolume("0.0"));
        }else{
            setCurrentVolVal(tempVolVal);
            dispatch(setMediaVolume(tempVolVal/100));
            setTempVolVal(0);
        }
        
    }
    return(
        <div className="volume-h-div">
            {!isMute && <HiOutlineSpeakerWave className="volume-h-speaker-img" onClick={()=>muteMedia(true)} />}
            {isMute && <HiOutlineSpeakerXMark className="volume-h-speaker-img" onClick={()=>muteMedia(false)} />}
            <input type="range" min="0" max="100"  className="volume_progress_bar" id="volume_progress_bar" value={currentVolVal} onChange={(event)=>updateMediaVolume(event)}></input>
        </div>
    );
}