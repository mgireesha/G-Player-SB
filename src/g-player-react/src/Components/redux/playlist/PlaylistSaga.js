import { call, put, takeLatest } from "redux-saga/effects";
import { addToPlaylistAPI, createPlaylistAPI, deletePlaylistAPI, fetchPlaylistNamesAPI, fetchSongsInPlaylistAPI, renamePlaylistAPI } from "../GPApis";
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_RENAME_PLAYLIST_START } from "./PlaylistActionTypes";
import { addToPlaylistSucc, createPlaylistSucc, deltePlaylistSucc, fetchSongsInPlaylistSucc, fethPLaylistNamesSucc, renamePlaylistSucc } from "./PlaylistActions";
import { handleAPIError } from "../../utli";
import { deleteMusicPathSucc } from "../library/LibraryActions";

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
        const response = yield call(fetchSongsInPlaylistAPI, payload.playListId);
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

export function* onCreatePlaylist(){
    yield takeLatest(PLAYLIST_CREATE_PLAYLIST_START, onCreatePlaylistAsnc);
}

export function* onCreatePlaylistAsnc(payload){
    try {
        const response = yield call(createPlaylistAPI, payload.createPlaylistObj);
        if(response.status===200){
            const data = response.data;
            yield put(createPlaylistSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onDeletePlaylist(){
    yield takeLatest(PLAYLIST_DELETE_PLAYLIST_START, onDeletePlaylistAsnc);
}

export function* onDeletePlaylistAsnc(payload){
    try {
        const response = yield call(deletePlaylistAPI, payload.playlistId);
        if(response.status===200){
            yield put(deltePlaylistSucc(payload.playlistId));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onRenamePlaylist(){
    yield takeLatest(PLAYLIST_RENAME_PLAYLIST_START, onRenamePlaylistAsnc);
}

export function* onRenamePlaylistAsnc(payload){
    try {
        const response = yield call(renamePlaylistAPI, payload.playlistName);
        if(response.status===200){
            const data = response.data;
            yield put(renamePlaylistSucc(data.message));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}