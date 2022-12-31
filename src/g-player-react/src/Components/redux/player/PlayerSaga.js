import { call, put, takeLatest } from "redux-saga/effects";
import { handleAPIError, setCookies } from "../../utli";
import { getCurrentSongAndStatusAPI, getCurrentSongStatusAPI, playASongAPI, playPauseAPI, setMediaVolumeAPI, 
            setPlaybackLengthAPI, updateLyricsAPI } from "../GPApis";
import { fetchCurrentSontAndStatusSucc, fettchCurrentSongStatusSucc, playASongSucc, playPauseSucc, 
            setMediaVolumeSucc, setPlayBackLengthSucc, updateLyricsSucc } from "./PlayerActions";
import { PLAYER_CURRENT_SONG_AND_STATUS_START, PLAYER_CURRENT_SONG_STATUS_START, PLAYER_PLAY_A_SONG_START, 
        PLAYER_PLAY_PAUSE_START, PLAYER_SET_MEDIA_VOLUME_START, PLAYER_SET_PB_LENGTH_START, 
        PLAYER_UPDATE_LYRICS_START 
    } from "./PlayerActionTypes";

export function * onPlayPause() {
    yield takeLatest(PLAYER_PLAY_PAUSE_START,onPlayPauseAsync);
}

export function* onPlayPauseAsync(){
    try {
        const response = yield call(playPauseAPI);
        if(response.status===200){
            const data = response.data;
            yield put(playPauseSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onPlayASong(){
    yield takeLatest(PLAYER_PLAY_A_SONG_START, onPlayASongAsync);
}

export function* onPlayASongAsync(payload){
    try {
        console.log("payload",payload)
        const response = yield call(playASongAPI,payload.songId, payload.currentVolume);
        if(response.status===200){
            const data = response.data;
            //console.log("data.library",data.library);
            //console.log("btoa(data.library)",btoa(data.library));
            yield put(playASongSucc(data,payload.playedFrom,payload.currentVolume));
            //setCookies("songPlaying", btoa(JSON.stringify(data.library)));
            //setCookies("playedFrom", payload.playedFrom);
            
            //if(data.status==="UNKNOWN")fettchCurrentSongStatus();
        }
    }catch (error){
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchCurrentSongStatus(){
    yield takeLatest(PLAYER_CURRENT_SONG_STATUS_START, onFetchCurrentSongStatusAsync);
}

export function* onFetchCurrentSongStatusAsync(){
    try {
        const response = yield call(getCurrentSongStatusAPI);
        if(response.status === 200){
            yield put(fettchCurrentSongStatusSucc(response.data));
        }
    } catch (error) {
        console.log(error)
    }
}

export function* onSetMediaVolume(){
    yield takeLatest(PLAYER_SET_MEDIA_VOLUME_START, onSetMediaVolumeAsync);
}

export function* onSetMediaVolumeAsync(payload){
    try {
        const response = yield call(setMediaVolumeAPI,payload.volume);
        if(response.status === 200){
            yield put(setMediaVolumeSucc(response.data.gMedia));
            setCookies("currentVolume",response.data.gMedia.currentVolume);
        }
    } catch (error) {
        console.log(error);
    }
}

export function* onSetPlayBackTime(){
    yield takeLatest(PLAYER_SET_PB_LENGTH_START, onSetPlayBackTimeAsync);
}

export function* onSetPlayBackTimeAsync(payload){
    try {
        const response = yield call(setPlaybackLengthAPI,payload.pbVal);
        if(response.status === 200){
            yield put(setPlayBackLengthSucc(response.data.gMedia));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* onFetchCurrentSongAndStatus(){
    yield takeLatest(PLAYER_CURRENT_SONG_AND_STATUS_START, onFetchCurrentSongAndStatusAsync);
}

export function* onFetchCurrentSongAndStatusAsync(){
    try {
        const response = yield call(getCurrentSongAndStatusAPI);
        if(response.status === 200){
            yield put(fetchCurrentSontAndStatusSucc(response.data));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* onUpdateLyrics(){
    yield takeLatest(PLAYER_UPDATE_LYRICS_START, onUpdateLyricsAsync);
}

export function* onUpdateLyricsAsync(payload){
    try {
        const response = yield call(updateLyricsAPI,payload.songId, payload.lyrics);
        if(response.status === 200){
            yield put(updateLyricsSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}