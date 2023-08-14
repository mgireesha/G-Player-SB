import { onDeleteMusicPath, onFetchAlbum, onFetchAlbumimgs, onFetchAlbumListOfAA, onFetchAlbumTracks, onFetchAllAlbumArtistsDtls, onFetchAllAlbumDtls, onFetchAllAlbums, onFetchAllArtistsDtls, onFetchAllHistory, onFetchAllSongs, onFetchBuildStatus, onFetchGenreDetails, onFetchMostPlayedData, onFetchMusicPath, onFetchSongsByArtist, onFetchSongsByGenre, onInitArtistImgDownload, onInitLibraryBuild, onsaveMusicPath, onSearchByKey, onUpdateHistory, onUploadArtistImg } from "./library/LibrarySaga";
import {all} from 'redux-saga/effects'
import { onFetchCurrentSongAndStatus, onFetchCurrentSongStatus, onPlayASong, onPlayPause, onSetMediaVolume, onSetPlayBackTime, onUpdateLyrics } from "./player/PlayerSaga";
import { onAddToPlaylist, onCreatePlaylist, onDeletePlaylist, onExportPlaylists, onFetchPlaylistNames, onFetchSongsInPlaylist, onImportPlaylists, onRemoveFromPlaylist, onRenamePlaylist } from "./playlist/PlaylistSaga";

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
        onFetchGenreDetails(),
        onFetchSongsByGenre(),
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
        onFetchMostPlayedData(),
        onInitArtistImgDownload(),
        onFetchPlaylistNames(),
        onFetchSongsInPlaylist(),
        onAddToPlaylist(),
        onCreatePlaylist(),
        onDeletePlaylist(),
        onRenamePlaylist(),
        onRemoveFromPlaylist(),
        onExportPlaylists(),
        onImportPlaylists(),
        onUploadArtistImg()
    ])
}