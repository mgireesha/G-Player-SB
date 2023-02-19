import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMediaVolume } from "../redux/player/PlayerActions";

import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from "react-icons/hi2";
import { SliderRC } from "../SliderRC";
import { getCookieValue, setCookies } from "../utli";
import { TEMP_VOLUME } from "../redux/GPActionTypes";

export const VolumeH = () => {
    const dispatch = useDispatch();
    const currentVolume = useSelector(state => state.player.currentVolume);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const [isMute,setIsMute] = useState(false);

    useEffect(() => {
        const handleEscape = (event) => {
            if(event.code === "KeyM"){
                if(isMute){
                    muteMedia(false);
                }else{
                    muteMedia(true);
                }
            }
        };
        window.addEventListener('keyup', handleEscape);
        return () => {
            window.removeEventListener('keyup', handleEscape);
        };
    }, [isMute]);

    useEffect(()=>{
        if(songPlaying!==null){
            if(currentVolume===undefined || currentVolume===null)dispatch(setMediaVolume(0.6));
        }
    },[songPlaying]);

    useEffect(()=>{
        let isMute1 = false;
        if(parseInt(currentVolume*100)===0){
            isMute1 = true;
        }
        setIsMute(isMute1); 
    },[currentVolume]);

    const updateMediaVolume = (event) => {
        const value = event;
        dispatch(setMediaVolume(value/100));
    }

    const muteMedia = (mute) => {
        if(mute){
            setCookies(TEMP_VOLUME, currentVolume);
            dispatch(setMediaVolume("0.0"));
        }else{
            let tempVol = getCookieValue(TEMP_VOLUME);
            if(tempVol===undefined || tempVol === 0)tempVol=0.6;
            dispatch(setMediaVolume(tempVol));
        }
        
    }
    return(
        <div className="volume-h-div">
            <div className="volume-h-speaker-img">
                {!isMute && <HiOutlineSpeakerWave className="volume-h-speaker-img" onClick={()=>muteMedia(true)} />}
                {isMute && <HiOutlineSpeakerXMark className="volume-h-speaker-img" onClick={()=>muteMedia(false)} />}
            </div>
            <input type="range" min="0" max="100"  className="volume_progress_bar no-display" id="volume_progress_bar" value={currentVolume*100} onChange={(event)=>updateMediaVolume(event)}></input>
            <div className="volume_progress_bar"><SliderRC value={currentVolume*100} onValChange={updateMediaVolume} step={5} /></div>
            <span className="volume-h-value">{Math.floor(currentVolume*100)}</span>
        </div>
    );
}