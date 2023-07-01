import { ADD, RENAME } from "../GPActionTypes"
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_SUCCESS, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_SUCCESS, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS, PLAYLIST_RENAME_PLAYLIST_START, PLAYLIST_RENAME_PLAYLIST_SUCCESS, SET_SHOW_CREATE_PLAYLIST_POPUP } from "./PlaylistActionTypes"

export const fetchPlaylistNames = () => ({
    type: PLAYLIST_FETCH_PLAYLIST_NAMES_START
})

export const fethPLaylistNamesSucc = (resp) => ({
    type:PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS,
    resp
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

export const renamePlaylist = (playlistName) => ({
    type: PLAYLIST_RENAME_PLAYLIST_START,
    playlistName
})

export const renamePlaylistSucc = (playlistName) => ({
    type:PLAYLIST_RENAME_PLAYLIST_SUCCESS,
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

export const getUpdatedPlayListNames = (playListNames, playListName, action) => {
    if(action === ADD){
        return [...playListNames, playListName];
    }else if(action === RENAME){
        playListNames.forEach(element => {
            if(element.messageId === playListName.messageId){
                element.value = playListName.value;
            }
        });
        return playListNames;
    }else{
        return playListNames.filter((pl)=>{return pl.messageId !== parseInt(playListName)});
    }
    
}

export const getUpdatedPlayListAlbums = (playlistAlbums, playlistName, action) => {
    playlistAlbums[playlistName.messageId] = [];
    return playlistAlbums;
}