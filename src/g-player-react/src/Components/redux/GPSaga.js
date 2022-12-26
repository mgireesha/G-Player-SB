import { onFetchAlbum, onFetchAlbumDtlsByAlbumArtist, onFetchAlbumimgs, onFetchAllAlbumArtistsDtls, onFetchAllAlbumDtls, onFetchAllAlbums, onFetchAllArtistsDtls, onFetchAllSongs, onFetchSongsByArtist } from "./library/LibrarySaga";
import {all} from 'redux-saga/effects'
import { onFetchCurrentSongAndStatus, onFetchCurrentSongStatus, onPlayASong, onPlayPause, onSetMediaVolume, onSetPlayBackTime, onUpdateLyrics } from "./player/PlayerSaga";

export function* GPSaga(){
    yield all([
        onFetchAllSongs(),
        onPlayPause(),
        onPlayASong(),
        onFetchCurrentSongStatus(),
        onSetMediaVolume(),
        onFetchAllAlbums(),
        onFetchAlbumimgs(),
        onFetchAllAlbumDtls(),
        onFetchAlbum(),
        onSetPlayBackTime(),
        onFetchAllArtistsDtls(),
        onFetchSongsByArtist(),
        onFetchAllAlbumArtistsDtls(),
        onFetchAlbumDtlsByAlbumArtist(),
        onFetchCurrentSongAndStatus(),
        onUpdateLyrics()
    ])
}