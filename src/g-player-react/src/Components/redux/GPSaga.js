import { onDeleteMusicPath, onFetchAlbum, onFetchAlbumDtlsByAlbumArtist, onFetchAlbumimgs, onFetchAlbumListOfAA, onFetchAlbumTracks, onFetchAllAlbumArtistsDtls, onFetchAllAlbumDtls, onFetchAllAlbums, onFetchAllArtistsDtls, onFetchAllHistory, onFetchAllSongs, onFetchMusicPath, onFetchSongsByArtist, onInitLibraryBuild, onsaveMusicPath, onSearchByKey } from "./library/LibrarySaga";
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
        onsaveMusicPath(),
        onFetchMusicPath(),
        onDeleteMusicPath(),
        onSearchByKey(),
        onFetchAllHistory()
    ])
}