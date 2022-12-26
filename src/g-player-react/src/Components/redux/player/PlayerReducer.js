import { INIT, LOADING, SUCCESS, TRACK_LIST } from "../GPActionTypes";
import { FETCH_SONGS_START } from "../library/LibraryActionTypes";
import { PLAYER_CURRENT_SONG_AND_STATUS_START, PLAYER_CURRENT_SONG_AND_STATUS_SUCCESS, PLAYER_CURRENT_SONG_STATUS_START, PLAYER_CURRENT_SONG_STATUS_SUCCESS, PLAYER_PLAY_A_SONG_START, PLAYER_PLAY_A_SONG_SUCCESS, PLAYER_PLAY_PAUSE_START, PLAYER_PLAY_PAUSE_SUCCESS, PLAYER_SET_MEDIA_VOLUME_START, PLAYER_SET_MEDIA_VOLUME_SUCCESS, PLAYER_SET_PB_LENGTH_START, PLAYER_SET_PB_LENGTH_SUCCESS, PLAYER_UPDATE_LYRICS_SUCCESS, SET_PLAYER_ISPLAYING, SET_PLAYER_ISREPEAT, SET_PLAYER_PLAYED_FROM } from "./PlayerActionTypes";

export const initialState = {
    isPlaying:false,
    isRepeat:false,
    songPlaying:null,
    songPlayingImg:null,
    playingSongStat:{},
    currentVolume: 0.7,
    playedFrom:TRACK_LIST,
    phase:INIT
}

const playerReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_SONGS_START:
            return{
                ...state,
                phase: LOADING
            }
        case SET_PLAYER_ISPLAYING:
            return{
                ...state,
                isPlaying: action.isPlaying
            }
        case PLAYER_PLAY_PAUSE_START:
            return{
                ...state,
                phase:LOADING
                //,isPlaying:!state.isPlaying
            }
        case PLAYER_PLAY_PAUSE_SUCCESS:
            return{
                ...state,
                isPlaying: action.response.status==='PLAYING'?true:false,
                phase: SUCCESS
            }
        case PLAYER_PLAY_A_SONG_START:
            return{
                ...state,
                phase:LOADING
            }
        case PLAYER_PLAY_A_SONG_SUCCESS:
            return{
                ...state,
                //isPlaying: action.response.status==='PLAYING'?true:false,
                songPlaying: action.response.library,
                songPlayingImg: action.response.library.albumArt,
                playedFrom:action.playedFrom,
                phase: SUCCESS
            }
        case PLAYER_CURRENT_SONG_STATUS_START:
            return{
                ...state,
                phase:LOADING
            }
        case PLAYER_CURRENT_SONG_STATUS_SUCCESS:
            return{
                ...state,
                playingSongStat:action.playingSongStat,
                //isPlaying: action.isPlaying,
                phase: SUCCESS
            }
        case PLAYER_SET_MEDIA_VOLUME_START:
            return{
                ...state,
                phase:LOADING
            }
        case PLAYER_SET_MEDIA_VOLUME_SUCCESS:
            return{
                ...state,
                currentVolume:action.playingSongStat.currentVolume,
                phase: SUCCESS
            }
        case PLAYER_SET_PB_LENGTH_START:
            return{
                ...state,
                phase:LOADING
            }
        case PLAYER_SET_PB_LENGTH_SUCCESS:
            return{
                ...state,
                playingSongStat:action.playingSongStat,
                phase: SUCCESS
            }
        case SET_PLAYER_PLAYED_FROM:
            return{
                ...state,
                playedFrom: action.playedFrom
            }
        case PLAYER_CURRENT_SONG_AND_STATUS_START:
            return{
                ...state,
                phase: LOADING
            }
        case PLAYER_CURRENT_SONG_AND_STATUS_SUCCESS:
            return{
                ...state,
                isPlaying: action.response.status==='PLAYING'?true:false,
                songPlaying: action.response.library,
                songPlayingImg: action.response.library.albumArt,
                playingSongStat:action.response.gMedia,
                currentVolume: action.response.gMedia.currentVolume,
                phase: SUCCESS
            }
        case SET_PLAYER_ISREPEAT:
            return{
                ...state,
                isRepeat: action.isRepeat
            }
        case PLAYER_UPDATE_LYRICS_SUCCESS:{
            return{
                ...state,
                songPlaying: action.response.library,
                phase: PLAYER_UPDATE_LYRICS_SUCCESS
            }
        }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default playerReducer;