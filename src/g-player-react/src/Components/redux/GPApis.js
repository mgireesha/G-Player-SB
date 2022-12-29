import axios from "axios";

//const baseURL = 'http://gplayer.test.com:8080';
const baseURL = 'http://localhost:8085';
const iAxios = axios.create({
    baseURL:baseURL,
    headers:{
        'Content-Type':'application/json'
    },
    timeout:120000
});

export const getAllSongsAPI = () =>{
    return iAxios.get('/library/getAllSongs').then(response => response);
}

export const fetchAllAlbumsAPI = () => {
    return iAxios.get('/library/getAllAlbums').then(response => response);
}

export const fetchAlbumAPI = (albumName) => {
    return iAxios.get(`/library/getByAlbum/${albumName}`).then(response => response);
}

export const fetchAllAlbumDtlsAPI = () => {
    return iAxios.get('/library/getAllAlbumDetails').then(response => response);
}

export const fetchAlbumImgsAPI = () => {
    return iAxios.get('/library/getAlbumImgs').then(response => response);
}

export const fetchAllArtistsDtlsAPI = () => {
    return iAxios.get('/library/getAllArtistDetails').then(response => response);
}

export const fetchAllArtistsImgDtlsAPI = () => {
    return iAxios.get('/library/getAllArtistImgDetails').then(response => response);
}

export const fetchAllAlbumArtistsDtlsAPI = () => {
    return iAxios.get('/library/getAllAlbumArtistDetails').then(response => response);
}

export const fetchAllAlbumArtistsImgDtlsAPI = () => {
    return iAxios.get('/library/getAllAlbumArtistImgDetails').then(response => response);
}

export const fetchSongsByArtistAPI = (artist) => {
    return iAxios.get(`/library/getByArtist/${artist}`).then(response => response);
}

export const fetchalbumDetailsByAlbumArtistAPI = (albumArtist) => {
    return iAxios.get(`/library/getAllAlbumDetailsByAA/${albumArtist}`).then(response => response);
}

export const updateLyricsAPI = (songId, lyrics) => {
    return iAxios.put(`/library/updateLyrics/${songId}`,lyrics).then(response => response);
}

export const playPauseAPI = () => {
    return iAxios.get('/media/playPause').then(response => response);
}

export const playASongAPI = (songId, currentVolume) => {
    return iAxios.put(`/media/playSong/${songId}`,currentVolume).then(response => response);
}

export const getCurrentSongStatusAPI = () => {
    return iAxios.get(`/media/getCurrentSongStatus`).then(response => response);
}

export const getCurrentSongAndStatusAPI = () => {
    return iAxios.get(`/media/getCurrentSongAndStatus`).then(response => response);
}

export const setMediaVolumeAPI = (volume) => {
    return iAxios.get(`/media/volume/${volume}`).then(response => response);
}

export const setPlaybackLengthAPI = (pbVal) => {
    return iAxios.get(`/media/forward/${pbVal}`).then(response => response);
}