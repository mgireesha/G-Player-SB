import { call, put, takeLatest } from "redux-saga/effects";
import { handleAPIError } from "../../utli";
import { fetchAlbumAPI, fetchalbumDetailsByAlbumArtistAPI, fetchAlbumImgsAPI, fetchAllAlbumArtistsDtlsAPI, 
        fetchAllAlbumArtistsImgDtlsAPI, fetchAllAlbumDtlsAPI, fetchAllAlbumsAPI, fetchAllArtistsDtlsAPI, 
        fetchAllArtistsImgDtlsAPI, fetchSongsByArtistAPI, getAllSongsAPI 
    } from "../GPApis";
import { fetchAlbumDetailsByAlbumArtistSucc, fetchAlbumImgsScc, fetchAlbumSucc, 
        fetchAllAlbumArtistsDtlsSucc, fetchAllAlbumsDtlsSucc, fetchAllAlbumsSucc, 
        fetchAllArtistsDtlsSucc, fetchSongsByArtistSucc, fethAllSongsSucc 
    } from "./LibraryActions";
import { FETCH_SONGS_START, LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_START, 
    LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, 
    LIBRARY_FETCH_ALBUM_IMGS_START, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ARTIST_LIST_START, 
    LIBRARY_FETCH_SONGS_BY_ARTIST_START 
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

export function* onFetchAllArtistsDtlsAsync(){
    try {
        const response = yield call(fetchAllArtistsDtlsAPI);
        const response1 = yield call(fetchAllArtistsImgDtlsAPI);
        if(response.status === 200 && response1.status===200){
            yield put(fetchAllArtistsDtlsSucc(response.data,response1.data));
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

export function* onFetchAllAlbumArtistsDtlsAsync(){
    try {
        const response = yield call(fetchAllAlbumArtistsDtlsAPI);
        const response1 = yield call(fetchAllAlbumArtistsImgDtlsAPI);
        if(response.status === 200 && response1.status===200){
            yield put(fetchAllAlbumArtistsDtlsSucc(response.data,response1.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onFetchAlbumDtlsByAlbumArtist(){
    yield takeLatest(LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, onFetchAlbumDtlsByAlbumArtistAsync);
}

export function* onFetchAlbumDtlsByAlbumArtistAsync(payload){
    try {
        const response = yield call(fetchalbumDetailsByAlbumArtistAPI,payload.albumArtist);
        if(response.status === 200){
            yield put(fetchAlbumDetailsByAlbumArtistSucc(response.data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}