import { ADD, INIT, LOADING, REMOVE, SUCCESS } from "../GPActionTypes";
import { PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_SUCCESS, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_SUCCESS, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS, SET_SHOW_CREATE_PLAYLIST_POPUP } from "./PlaylistActionTypes";
import { getUpdatedPlayListNames } from "./PlaylistActions";

export const initialState = {
    playListNames:[],
    playlistSongs:[],
    showCreatePlaylistPopup: false,
    phase:INIT
}

const playlistReducer = (state = initialState, action) => {
    switch(action.type){
        case PLAYLIST_FETCH_PLAYLIST_NAMES_START:
            return{
                ...state,
                phase: LOADING
            }
        case PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS:
            return{
                ...state,
                playListNames:action.playListNames,
                phase:SUCCESS
            }
        case PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START:
            return{
                ...state,
                phase: LOADING
            }
        case PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS:
            return{
                ...state,
                playlistSongs:action.playlistSongs,
                phase:SUCCESS
            }
        case PLAYLIST_CREATE_PLAYLIST_START:
            return{
                ...state,
                phase: LOADING
            }
        case PLAYLIST_CREATE_PLAYLIST_SUCCESS:
            return{
                ...state,
                playListNames: getUpdatedPlayListNames([...state.playListNames], action.playlistName, ADD),
                phase:PLAYLIST_CREATE_PLAYLIST_SUCCESS
            }
        case PLAYLIST_DELETE_PLAYLIST_START:
            return{
                ...state,
                phase: LOADING
            }
        case PLAYLIST_DELETE_PLAYLIST_SUCCESS:
            return{
                ...state,
                playListNames: getUpdatedPlayListNames([...state.playListNames], action.playlistId, REMOVE),
                playlistSongs:[],
                phase:PLAYLIST_DELETE_PLAYLIST_SUCCESS
            }
        case SET_SHOW_CREATE_PLAYLIST_POPUP:
            return{
                ...state,
                showCreatePlaylistPopup: action.showCreatePlaylistPopup
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default playlistReducer;