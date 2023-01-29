import { onDeleteMusicPath, onFetchAlbum, onFetchAlbumimgs, onFetchAlbumListOfAA, onFetchAlbumTracks, onFetchAllAlbumArtistsDtls, onFetchAllAlbumDtls, onFetchAllAlbums, onFetchAllArtistsDtls, onFetchAllHistory, onFetchAllSongs, onFetchBuildStatus, onFetchMostPlayedData, onFetchMusicPath, onFetchSongsByArtist, onInitLibraryBuild, onsaveMusicPath, onSearchByKey, onUpdateHistory } from "./library/LibrarySaga";
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
        onFetchAllHistory(),
        onUpdateHistory(),
        onFetchBuildStatus(),
        onFetchMostPlayedData()
    ])
}