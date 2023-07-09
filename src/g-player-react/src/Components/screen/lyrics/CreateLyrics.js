import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLyrics } from "../../redux/player/PlayerActions";
import { getMins0 } from "../../utli";

export const CreateLyrics = ({onSetIsreateLyricsStarted, newLyrics}) => {
    const dispatch = useDispatch();
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playingSongStat = useSelector(state => state.player.playingSongStat); 
    const [lyrics, setLyrics] = useState(null);
    const [lyricsP, setLyricsP] = useState({});
    const [selectedLineIndex, setSelectedLineIndex] = useState(0);


    useEffect(()=>{
        if(newLyrics!==null && newLyrics!==undefined){
            const tempLyrics = newLyrics.split("\n");
            const tempLyricsObj = {};
            let counter = 0;
            tempLyrics.forEach((line, index) => {
                if(line!==""){
                    tempLyricsObj[counter] = line;
                    counter++;
                }
            });
            setLyrics(tempLyricsObj);
        }
        
    },[newLyrics]);

    const setTime = () => {
        const tempLyricsP = {...lyricsP}
        let currentTime = Math.floor(parseInt(playingSongStat.currentTime)/1000);
        currentTime = getMins0(currentTime);//.replaceAll(":","-")
        //const tempLyricsPKeys = Object.keys(tempLyricsP);
        //tempLyricsP[currentTime] = lyrics[tempLyricsPKeys.length-1]!==undefined?lyrics[tempLyricsPKeys.length-1]:'';
        if(lyrics[selectedLineIndex]!==undefined)tempLyricsP[currentTime] = lyrics[selectedLineIndex];
        setSelectedLineIndex(selectedLineIndex+1);
        setLyricsP(tempLyricsP);
    }

    const setExitingTime = (time) => {
        if(!time)return false;
        const tempLyricsP = {...lyricsP}
        let currentTime = Math.floor(parseInt(playingSongStat.currentTime)/1000);
        currentTime = getMins0(currentTime);
        delete Object.assign(tempLyricsP, {[currentTime]: tempLyricsP[time] })[time];
        setLyricsP(tempLyricsP);
    }

    function getKeyByValue(value) {
        const object = {...lyricsP};
        if(object===undefined || object===null)return "";
        return Object.keys(object).find(key => object[key] === value);
      }

      const isLineSelected = (index) => {
        return Object.keys(lyricsP)[index];
      }

      const initUpdateLyrics = () =>{
        const tempLyricsP = {...lyricsP};
        let lyrics = "";
        if(songPlaying.artist!==undefined){
            lyrics = lyrics+"[ar:"+songPlaying.artist+"]\n"
        }
        if(songPlaying.album!==undefined){
            lyrics = lyrics+"[al:"+songPlaying.album+"]\n"
        }
        if(songPlaying.title!==undefined){
            lyrics = lyrics+"[ti:"+songPlaying.title+"]\n"
        }
        if(songPlaying.lyricist!==undefined){
            lyrics = lyrics+"[au:"+songPlaying.lyricist+"]\n"
        }
        if(songPlaying.trackLength!==undefined){
            lyrics = lyrics+"[au:"+getMins0(songPlaying.trackLength)+"]\n"
        }
        lyrics = lyrics+"[by:g_player]\n"
        Object.keys(tempLyricsP).forEach((time) => {
            lyrics = lyrics+"["+time+":00]"+tempLyricsP[time]+"\n"
        });
        ///const lyrics = JSON.stringify(tempLyricsP);
        if(lyrics==="" || lyrics===null){
            alert("Please paste lyrics");
            return false;
        }
        dispatch(updateLyrics(songPlaying.songId, lyrics));
    }

    return(
        <>
            <div style={{maxHeight:'12em',overflowY:'auto',marginLeft:'20%'}}>
                {lyrics!==null && Object.values(lyrics).map((line, index) =>
                    <div style={{display:'flex',justifyContent:'flex-start'}}>
                        <div style={{padding:5}}>
                            <span className={isLineSelected(index)!==undefined?'text-highlighted-y':''}
                                onClick={()=>setExitingTime(isLineSelected(index))}
                                style={{cursor:'pointer'}}
                                >
                                    {isLineSelected(index)!==undefined?isLineSelected(index):'00:00'}
                            </span>
                            
                        </div>
                        <div style={{padding:5}}>
                            <label style={{width:'100%',marginBottom:10}}>{line}</label>
                        </div>
                    </div>    
                )}
                <div className="show-lyrics-btn-container" style={{display: 'flex',flexDirection: 'column',width: '13%', bottom:'48%'}}>
                <a onClick={initUpdateLyrics} className="lyrics-btn lyrics-btn-add">Save</a>
                <a class="lyrics-btn lyrics-btn-cancel" onClick={setTime}>click</a>
                <a onClick={()=>onSetIsreateLyricsStarted(false)} className="lyrics-btn lyrics-btn-cancel">Cancel</a>
            </div>
            </div>
            
        </>
    );
}