import { ADD } from "../GPActionTypes"
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_SUCCESS, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_SUCCESS, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS, SET_SHOW_CREATE_PLAYLIST_POPUP } from "./PlaylistActionTypes"

export const fetchPlaylistNames = () => ({
    type: PLAYLIST_FETCH_PLAYLIST_NAMES_START
})

export const fethPLaylistNamesSucc = (playListNames) => ({
    type:PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS,
    playListNames
})

export const fetchSongsInPlaylist = (playListId) => ({
    type: PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START,
    playListId
})

export const fetchSongsInPlaylistSucc = (playlistSongs) => ({
    type:PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS,
    playlistSongs
})

export const addToPlaylist = (reqPLObj) => ({
    type: PLAYLIST_ADD_TO_PLAYLIST_START,
    reqPLObj
})

export const addToPlaylistSucc = (playlists) => ({
    type:PLAYLIST_ADD_TO_PLAYLIST_SUCCESS,
    playlists
})

export const createPlaylist = (createPlaylistObj) => ({
    type: PLAYLIST_CREATE_PLAYLIST_START,
    createPlaylistObj
})

export const createPlaylistSucc = (playlistName) => ({
    type:PLAYLIST_CREATE_PLAYLIST_SUCCESS,
    playlistName
})

export const deltePlaylist = (playlistId) => ({
    type: PLAYLIST_DELETE_PLAYLIST_START,
    playlistId
})

export const deltePlaylistSucc = (playlistId) => ({
    type:PLAYLIST_DELETE_PLAYLIST_SUCCESS,
    playlistId
})

export const setShowCreatePlaylistPopup = (showCreatePlaylistPopup) => ({
    type: SET_SHOW_CREATE_PLAYLIST_POPUP,
    showCreatePlaylistPopup
})

export const getUpdatedPlayListNames = (playListNames, playListName, action) => {
    if(action === ADD){
        return [...playListNames, playListName];
    }else{
        return playListNames.filter((pl)=>{return pl.messageId !== parseInt(playListName)});
    }
    
}