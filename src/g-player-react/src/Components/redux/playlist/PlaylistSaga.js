import { call, put, takeLatest } from "redux-saga/effects";
import { addToPlaylistAPI, createPlaylistAPI, deletePlaylistAPI, exportPlaylistsAPI, fetchPlaylistNamesAPI, fetchSongsInPlaylistAPI, importPlaylistsAPI, removeFromPlaylistAPI, renamePlaylistAPI } from "../GPApis";
import { PLAYLIST_ADD_TO_PLAYLIST_START, PLAYLIST_CREATE_PLAYLIST_START, PLAYLIST_DELETE_PLAYLIST_START, PLAYLIST_EXPORT_PLAYLISTS_START, PLAYLIST_FETCH_PLAYLIST_NAMES_START, PLAYLIST_FETCH_SONGS_IN_PLAYLIST_START, PLAYLIST_IMPORT_PLAYLISTS_START, PLAYLIST_REMOVE_FROM_PLAYLIST_START, PLAYLIST_RENAME_PLAYLIST_START } from "./PlaylistActionTypes";
import { addToPlaylistSucc, createPlaylistSucc, deltePlaylistSucc, exportPlaylistsSucc, fetchSongsInPlaylistSucc, fethPLaylistNamesSucc, importPlaylistsSucc, removeFromPlaylistSucc, renamePlaylistSucc } from "./PlaylistActions";
import { handleAPIError } from "../../utli";
import { setCommonPopupObj, setShowContextMenu, setStatusMessage } from "../library/LibraryActions";
import { PLAYLIST_NAMES } from "../GPActionTypes";

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
            let addedSongsCount = data.playlists.length;
            const playlistItem = data.playlists[0];
            let successMessage = "Added "+addedSongsCount+" tracks to "+playlistItem.playlist+" playlist!";
            if(addedSongsCount === 1){
                const songPath = playlistItem.songPath;
                addedSongsCount = songPath.substring(songPath.lastIndexOf("\\")+1, songPath.indexOf("."));
                successMessage = "Added "+addedSongsCount+" to "+playlistItem.playlist+" playlist!";
            }
            yield put(setStatusMessage(successMessage));
            yield put(addToPlaylistSucc(data));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onRemoveFromPlaylist(){
    yield takeLatest(PLAYLIST_REMOVE_FROM_PLAYLIST_START, onRemoveFromPlaylistAsnc);
}

export function* onRemoveFromPlaylistAsnc(payload){
    try {
        const response = yield call(removeFromPlaylistAPI, payload.playListId, payload.songId);
        if(response.status===200){
            const data = response.data;
            yield put(setShowContextMenu(false));
            yield put(removeFromPlaylistSucc(data.playlist));
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
        const response = yield call(createPlaylistAPI, payload.createPlaylistObj.payload);
        if(response.status===200){
            const data = response.data;
            const tempAddedNewPlaylistObj = {
                isAddToNewPlaylist : false
            }
            if(payload.createPlaylistObj.addedNewPlaylistObj){
                tempAddedNewPlaylistObj.playlistName = data;
                tempAddedNewPlaylistObj.isAddToNewPlaylist = true
            }
            const resp = {
                playlistName: data,
                addedNewPlaylistObj: tempAddedNewPlaylistObj
            }
            yield put(createPlaylistSucc(resp));
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

export function* onExportPlaylists(){
    yield takeLatest(PLAYLIST_EXPORT_PLAYLISTS_START, onExportPlaylistsAsnc);
}

export function* onExportPlaylistsAsnc(){
    try {
        const response = yield call(exportPlaylistsAPI);
        if(response.status===200){
            const data = response.data;
            const message = Object.keys(data.response).length+' Playlists are exported to "'+data.status1+'" path.';
            yield put(setStatusMessage(message));
            yield put(setCommonPopupObj({showPopup:false}))
            //yield put(exportPlaylistsSucc());
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}

export function* onImportPlaylists(){
    yield takeLatest(PLAYLIST_IMPORT_PLAYLISTS_START, onImportPlaylistsAsnc);
}

export function* onImportPlaylistsAsnc(payload){
    try {
        const response = yield call(importPlaylistsAPI, payload.payload);
        if(response.status===200){
            const data = response.data;
            yield put(fethPLaylistNamesSucc(data.response));
            const message = data.status1+' Playlist/s are successfully imported!';
            yield put(setStatusMessage(message));
            yield put(setCommonPopupObj({showPopup:false}));
            yield put(importPlaylistsSucc());
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }

}