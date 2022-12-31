import { onFetchAlbum, onFetchAlbumDtlsByAlbumArtist, onFetchAlbumimgs, onFetchAlbumListOfAA, onFetchAlbumTracks, onFetchAllAlbumArtistsDtls, onFetchAllAlbumDtls, onFetchAllAlbums, onFetchAllArtistsDtls, onFetchAllSongs, onFetchSongsByArtist, onInitLibraryBuild, onsaveMusicPath } from "./library/LibrarySaga";
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
        onFetchAlbumTracks(),
        onSetPlayBackTime(),
        onFetchAllArtistsDtls(),
        onFetchSongsByArtist(),
        onFetchAllAlbumArtistsDtls(),
        onFetchAlbumListOfAA(),
        onFetchCurrentSongAndStatus(),
        onUpdateLyrics(),
        onFetchAlbum(),
        onInitLibraryBuild(),
        onsaveMusicPath()
    ])
}