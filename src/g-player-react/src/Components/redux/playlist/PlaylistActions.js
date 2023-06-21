import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_SUCCESS } from "./PlaylistActionTypes"

export const fetchPlaylistNames = () => ({
    type: PLAYLIST_FETCH_PLAYLIST_NAMES_START
})

export const fethPLaylistNamesSucc = (playListNames) => ({
    type:PLAYLIST_FETCH_PLAYLIST_NAMES_SUCCESS,
    playListNames
})

export const fetchSongsInPlaylist = (playlistName) => ({
    type: PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START,
    playlistName
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