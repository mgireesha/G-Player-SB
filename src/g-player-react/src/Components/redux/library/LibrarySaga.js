import { call, put, takeLatest } from "redux-saga/effects";
import { handleAPIError } from "../../utli";
import { deleteMusicPathAPI, fetchAlbumAPI, fetchalbumDetailsByAlbumArtistAPI, fetchAlbumImgsAPI,
         fetchalbumListOfAAAPI,
         fetchAlbumtracksAPI,
         fetchAllAlbumDtlsAPI, fetchAllAlbumsAPI, fetchAllArtistsDtlsAPI, 
         fetchAllHistoryAPI, 
         fetchMusicpathAPI, 
         fetchSongsByArtistAPI, getAllSongsAPI, initLibraryBuildAPI, saveMusicpathAPI, searchByKeyAPI 
    } from "../GPApis";
import { deleteMusicPathSucc, fetchAlbumDetailsByAlbumArtistSucc, fetchAlbumImgsScc, fetchAlbumlistOfAASucc, fetchAlbumSucc, 
        fetchAlbumTacksSucc, 
        fetchAllAlbumArtistsDtlsSucc, fetchAllAlbumsDtlsSucc, fetchAllAlbumsSucc, 
        fetchAllArtistsDtlsSucc, fetchAllHistorySucc, fetchMusicPathSucc, fetchSongsByArtistSucc, fethAllSongsSucc, initLibraryBuildSucc, saveMusicPathSucc, searchByKeySucc 
    } from "./LibraryActions";
import { FETCH_SONGS_START, HISTORY_FETCH_ALL_HISTORY_START, LIBRARY_DELETE_MUSIC_PATH_START, LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_START, 
    LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, 
    LIBRARY_FETCH_ALBUM_IMGS_START, LIBRARY_FETCH_ALBUM_LIST_OF_AA_START, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ALBUM_TRACKS_START, LIBRARY_FETCH_ARTIST_LIST_START, 
    LIBRARY_FETCH_MUSIC_PATH_START, 
    LIBRARY_FETCH_SONGS_BY_ARTIST_START, 
    LIBrARY_INIT_BUILD_LIBRARY_START,
    LIBRARY_SAVE_MUSIC_PATH_START,
    LIBRARY_SEARCH_BY_KEY_START
} from "./LibraryActionTypes";

export function* onFetchAllSongs(){
    yield takeLatest(FETCH_SONGS_START, onFetchAllSongsAsnc);
}

export function* onFetchAllSongsAsnc(){
    try {
        const response = yield call(getAllSongsAPI);
        if(response.status===200){
            const data = response.data;
            yield put(fethAllSongsSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onFetchAllAlbums(){
    yield takeLatest(LIBRARY_FETCH_ALBUMS_START, onFetchAllAlbumsAsync);
}

export function* onFetchAllAlbumsAsync(){
    try {
        const response = yield call(fetchAllAlbumsAPI);
        if(response.status === 200){
            yield put(fetchAllAlbumsSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAllAlbumDtls(){
    yield takeLatest(LIBRARY_FETCH_ALBUMS_DETAILS_START, onFetchAllAlbumDtlsAsync);
}

export function* onFetchAllAlbumDtlsAsync(){
    try {
        const response = yield call(fetchAllAlbumDtlsAPI);
        if(response.status === 200){
            yield put(fetchAllAlbumsDtlsSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAlbumimgs(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_IMGS_START, onFetchAlbumimgsAsync);
}

export function* onFetchAlbumimgsAsync(){
    try {
        const response = yield call(fetchAlbumImgsAPI);
        if(response.status === 200){
            yield put(fetchAlbumImgsScc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAlbumTracks(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_TRACKS_START, onFetchAlbumTracksAsync);
}

export function* onFetchAlbumTracksAsync(payload){
    try {
        const response = yield call(fetchAlbumtracksAPI,payload.albumName);
        if(response.status === 200){
            yield put(fetchAlbumTacksSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAlbum(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_START, onFetchAlbumAsync);
}

export function* onFetchAlbumAsync(payload){
    try {
        const response = yield call(fetchAlbumAPI,payload.albumName);
        if(response.status === 200){
            yield put(fetchAlbumSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAllArtistsDtls(){
    yield takeLatest(LIBRARY_FETCH_ARTIST_LIST_START, onFetchAllArtistsDtlsAsync);
}

export function* onFetchAllArtistsDtlsAsync(payload){
    try {
        const response = yield call(fetchAllArtistsDtlsAPI,payload.artistType);
        if(response.status === 200){
            yield put(fetchAllArtistsDtlsSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchSongsByArtist(){
    yield takeLatest(LIBRARY_FETCH_SONGS_BY_ARTIST_START, onFetchSongsByArtistAsync);
}

export function* onFetchSongsByArtistAsync(payload){
    try {
        const response = yield call(fetchSongsByArtistAPI,payload.artist);
        if(response.status === 200){
            yield put(fetchSongsByArtistSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAllAlbumArtistsDtls(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, onFetchAllAlbumArtistsDtlsAsync);
}

export function* onFetchAllAlbumArtistsDtlsAsync(payload){
    try {
        const response = yield call(fetchAllArtistsDtlsAPI,payload.artistType);
        if(response.status === 200){
            yield put(fetchAllAlbumArtistsDtlsSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAlbumListOfAA(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_LIST_OF_AA_START, onFetchAlbumListOfAAAsync);
}

export function* onFetchAlbumListOfAAAsync(payload){
    try {
        const response = yield call(fetchalbumListOfAAAPI,payload.albumArtist);
        if(response.status === 200){
            yield put(fetchAlbumlistOfAASucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}


//Side bar library
export function* onInitLibraryBuild(){
    yield takeLatest(LIBrARY_INIT_BUILD_LIBRARY_START, onInitLibraryBuildAsync);
}

export function*onInitLibraryBuildAsync(){
    try {
        const response = yield call(initLibraryBuildAPI);
        if(response.status === 200){
            yield put(initLibraryBuildSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onsaveMusicPath(){
    yield takeLatest(LIBRARY_SAVE_MUSIC_PATH_START, onsaveMusicPathAsync);
}

export function* onsaveMusicPathAsync(payload){
    try {
        const response = yield call(saveMusicpathAPI, payload.musicPath);
        if(response.status === 200){
            yield put(saveMusicPathSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchMusicPath(){
    yield takeLatest(LIBRARY_FETCH_MUSIC_PATH_START, onFetchMusicPathAsync);
}

export function* onFetchMusicPathAsync(){
    try {
        const response = yield call(fetchMusicpathAPI);
        if(response.status === 200){
            yield put(fetchMusicPathSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onDeleteMusicPath(){
    yield takeLatest(LIBRARY_DELETE_MUSIC_PATH_START, onDeleteMusicPathAsync);
}

export function* onDeleteMusicPathAsync(payload){
    try {
        const response = yield call(deleteMusicPathAPI, payload.musicPath.messageId);
        if(response.status === 200){
            yield put(deleteMusicPathSucc(response.data, payload.musicPath));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onSearchByKey(){
    yield takeLatest(LIBRARY_SEARCH_BY_KEY_START, onSearchByKeyAsync);
}

export function* onSearchByKeyAsync(payload){
    try {
        const response = yield call(searchByKeyAPI, payload.searchKey);
        if(response.status === 200){
            yield put(searchByKeySucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAllHistory(){
    yield takeLatest(HISTORY_FETCH_ALL_HISTORY_START, onFetchAllHistoryAsync);
}

export function* onFetchAllHistoryAsync(){
    try {
        const response = yield call(fetchAllHistoryAPI);
        if(response.status === 200){
            yield put(fetchAllHistorySucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}