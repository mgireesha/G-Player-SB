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

export const fetchAlbumtracksAPI = (albumName) => {
    return iAxios.get(`/library/getByAlbum/${albumName}`).then(response => response);
}

export const fetchAlbumAPI = (albumName) => {
    return iAxios.get(`/library/getAlbumByAlbumName/${albumName}`).then(response => response);
}

export const fetchAllAlbumDtlsAPI = () => {
    return iAxios.get('/library/getAllAlbumDetails').then(response => response);
}

export const fetchAlbumImgsAPI = () => {
    return iAxios.get('/library/getAlbumImgs').then(response => response);
}

export const fetchAllArtistsDtlsAPI = (artistType) => {
    return iAxios.get(`/library/getAllArtistDetails/${artistType}`).then(response => response);
}

export const fetchAllArtistsImgDtlsAPI = () => {
    return iAxios.get('/library/getAllArtistImgDetails').then(response => response);
}

export const fetchSongsByArtistAPI = (artist) => {
    return iAxios.get(`/library/getByArtist/${artist}`).then(response => response);
}

export const fetchalbumListOfAAAPI = (albumArtist) => {
    return iAxios.get(`/library/getAllAlbumDetailsByAA/${albumArtist}`).then(response => response);
}

export const updateLyricsAPI = (songId, lyrics) => {
    return iAxios.put(`/library/updateLyrics/${songId}`,lyrics).then(response => response);
}

//Sidebar library
export const initLibraryBuildAPI = () => {
    return iAxios.get(`/library/initLibraryBuild`).then(response => response);
}

export const searchByKeyAPI = (searchKey) => {
    return iAxios.get(`/library/searchByKey/${searchKey}`).then(response => response);
}

export const saveMusicpathAPI = (musicpath) => {
    return iAxios.post(`/message/saveMusicPath`,musicpath).then(response => response);
}

export const fetchMusicpathAPI = () => {
    return iAxios.get(`/message/getAllMusicPaths`).then(response => response);
}

export const deleteMusicPathAPI = (messageId) => {
    return iAxios.delete(`/message/removeMusicPath/${messageId}`, ).then(response => response);
}

export const fetchBuildStatusAPI = () => {
    return iAxios.get(`/message/getBuildStatus`).then(response => response);
}

//Media
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

//History Start
export const fetchAllHistoryAPI = () => {
    return iAxios.get(`/history/getAllGroupedHistory`).then(response => response);
}

export const updateHistoryAPI = (songId) => {
    return iAxios.put(`/history/updateHistory/${songId}`).then(response => response);
}

export const fetchMostPlayedDataAPI = () => {
    return iAxios.get(`/history/getMostPlayedData`).then(response => response);
}
//History End