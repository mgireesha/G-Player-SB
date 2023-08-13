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

export const fetchAlbumtracksAPI = (albumName, genre) => {
    if(genre){
        return iAxios.get(`/library/getByAlbum/${albumName}/${genre}`).then(response => response);
    }else{
        return iAxios.get(`/library/getByAlbum/${albumName}`).then(response => response);
    }
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

export const fetchGenreDetailsAPI = () => {
    return iAxios.get(`/library/genre-details`).then(response => response);
}

export const fetchSongsByGenreAPI = (genre) => {
    return iAxios.get(`/library/getByGenre/${genre}`).then(response => response);
}

export const uploadArtistImgAPI = (artistId,data) => {
    const headers = {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'multipart/form-data'
    }
    const tempAxios = iAxios
    return iAxios.put(`/library/upload-artist-image/${artistId}`,data, {
        headers:{
        'Content-Type': 'multipart/form-data',
        'Content-Disposition': 'form-data; name="file"'
        }
    }).then(response => response);
}

//Sidebar library
export const initLibraryBuildAPI = () => {
    return iAxios.get(`/library/initLibraryBuild`).then(response => response);
}

export const searchByKeyAPI = (searchKey) => {
    return iAxios.get(`/library/search/key/${searchKey}`).then(response => response);
}

export const saveMusicpathAPI = (musicpath) => {
    return iAxios.post(`/message/save-music-path`,musicpath).then(response => response);
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

export const initiateArtistImageDownload = () => {
    return iAxios.get(`/library/downloadArtistImgToDIr`).then(response => response);
}

//Media
export const playPauseAPI = () => {
    return iAxios.get('/media/playPause').then(response => response);
}

export const playASongAPI = (songId, currentVolume, currentPlayTime) => {
    if(currentVolume===undefined)currentVolume=0.5;
    let uri = `/media/playSong/${songId}`;
    if(currentPlayTime!==undefined){
        uri+=`?currentPlayTime=${currentPlayTime*1000}`;
    }else{
        uri+=`?currentPlayTime=`
    }
    return iAxios.put(uri,currentVolume).then(response => response);
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
    return iAxios.get(`/history/all-grouped-history`).then(response => response);
}

export const updateHistoryAPI = (songId) => {
    return iAxios.put(`/history/add-to-history/${songId}`).then(response => response);
}

export const fetchMostPlayedDataAPI = () => {
    return iAxios.get(`/history/most-played-data`).then(response => response);
}
//History End


//Playlist - Start

export const fetchPlaylistNamesAPI = () => {
    return iAxios.get(`/playlist/names/PLAYLIST`).then(response => response);
}

export const fetchSongsInPlaylistAPI = (playListId) => {
    return iAxios.get(`/playlist/${playListId}/songs`).then(response => response);
}

export const addToPlaylistAPI = (reqPLObj) => {
    return iAxios.post(`/playlist/add-to-playlist/`,reqPLObj).then(response => response);
}

export const removeFromPlaylistAPI = (playlistId, songId) => {
    return iAxios.delete(`/playlist/remove-from-playlist/${playlistId}/${songId}`).then(response => response);
}

export const createPlaylistAPI = (createPlaylistObj) => {
    return iAxios.post(`/playlist/create-playlist`,createPlaylistObj).then(response => response);
}

export const deletePlaylistAPI = (playlistId) => {
    return iAxios.delete(`/playlist/delete-playlist/${playlistId}`).then(response => response);
}

export const renamePlaylistAPI = (playlistName) => {
    return iAxios.put(`/playlist/rename-playlist`,playlistName).then(response => response);
}

export const exportPlaylistsAPI = () => {
    return iAxios.put(`/playlist/export`).then(response => response);
}

export const importPlaylistsAPI = (payload, fileType) => {
    return iAxios.post(`/playlist/import/${fileType}`, JSON.stringify(payload)).then(response => response);
}
//Playlist - End