import { call, put, takeLatest } from "redux-saga/effects";
import { addToPlaylistAPI, fetchPlaylistNamesAPI, fetchSongsInPlaylistAPI } from "../GPApis";
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START } from "./PlaylistActionTypes";
import { addToPlaylistSucc, fetchSongsInPlaylistSucc, fethPLaylistNamesSucc } from "./PlaylistActions";
import { handleAPIError } from "../../utli";
import { fetchSongsByArtistSucc } from "../library/LibraryActions";

export function* onFetchPlaylistNames(){
    yield takeLatest(PLAYLIST_FETCH_PLAYLIST_NAMES_START, onFetchPlaylistNamesAsnc);
}

export function* onFetchPlaylistNamesAsnc(){
    try {
        const response = yield call(fetchPlaylistNamesAPI);
        if(response.status===200){
            const data = response.data;
            yield put(fethPLaylistNamesSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onFetchSongsInPlaylist(){
    yield takeLatest(PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, onFetchSongsInPlaylistAsnc);
}

export function* onFetchSongsInPlaylistAsnc(payload){
    try {
        const response = yield call(fetchSongsInPlaylistAPI, payload.playlistName);
        if(response.status===200){
            const data = response.data;
            yield put(fetchSongsInPlaylistSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}
export function* onAddToPlaylist(){
    yield takeLatest(PLAYLIST_ADD_TO_PLAYLIST_START, onAddToPlaylistAsnc);
}

export function* onAddToPlaylistAsnc(payload){
    try {
        const response = yield call(addToPlaylistAPI, payload.reqPLObj);
        if(response.status===200){
            const data = response.data;
            yield put(addToPlaylistSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}