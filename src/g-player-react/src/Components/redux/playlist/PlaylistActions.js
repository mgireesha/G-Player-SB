import { ADD, RENAME } from "../GPActionTypes"
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_SUCCESS, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_SUCCESS, PLAYLIST_EXPORT_PLAYLISTS_START, PLAYLIST_EXPORT_PLAYLISTS_SUCCESS, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS, PLAYLIST_REMOVE_FROM_PLAYLIST_START, PLAYLIST_REMOVE_FROM_PLAYLIST_SUCCESS, PLAYLIST_RENAME_PLAYLIST_START, PLAYLIST_RENAME_PLAYLIST_SUCCESS, SET_ADDED_NEW_PLAYLIST_OBJ, SET_ADD_TO_NEW_PLAYLIST_OBJ, SET_IS_ADD_TO_NEW_PLAYLIST, SET_SHOW_CREATE_PLAYLIST_POPUP } from "./PlaylistActionTypes"

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

export const setAddedNewPlaylistObj = (addedNewPlaylistObj) => ({
    type: SET_ADDED_NEW_PLAYLIST_OBJ,
    addedNewPlaylistObj
})

export const removeFromPlaylist = (playListId, songId) => ({
    type: PLAYLIST_REMOVE_FROM_PLAYLIST_START,
    playListId,
    songId
})

export const removeFromPlaylistSucc = (playlistItem) => ({
    type:PLAYLIST_REMOVE_FROM_PLAYLIST_SUCCESS,
    playlistItem
})

export const createPlaylist = (createPlaylistObj) => ({
    type: PLAYLIST_CREATE_PLAYLIST_START,
    createPlaylistObj
})

export const createPlaylistSucc = (response) => ({
    type:PLAYLIST_CREATE_PLAYLIST_SUCCESS,
    response
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

export const exportPlaylists = () => ({
    type: PLAYLIST_EXPORT_PLAYLISTS_START
})

export const exportPlaylistsSucc = () => ({
    type: PLAYLIST_EXPORT_PLAYLISTS_SUCCESS
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

export const removeRemovedSongFromPlaylist = (playlistSongs, playlistItem) => {
    for (let i = 0; i < playlistSongs.length; i++) {
        const element = playlistSongs[i];
        if(element.songId === playlistItem.songId){
            playlistSongs.splice(i, 1);
            break;
        }
    }
    return playlistSongs;
}