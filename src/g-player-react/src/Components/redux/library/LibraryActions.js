import { SUCCESS } from "../GPActionTypes";
import { FETCH_SONGS_START, FETCH_SONGS_SUCCESS, 
        HISTORY_FETCH_ALL_HISTORY_START, 
        HISTORY_FETCH_ALL_HISTORY_SUCCESS, 
        LIBRARY_DELETE_MUSIC_PATH_START, 
        LIBRARY_DELETE_MUSIC_PATH_SUCCESS, 
        LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS, 
        LIBRARY_FETCH_ALBUMS_START, LIBRARY_FETCH_ALBUMS_SUCCESS, LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, 
        LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, 
        LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_SUCCESS, LIBRARY_FETCH_ALBUM_IMGS_START, 
        LIBRARY_FETCH_ALBUM_IMGS_SUCCESS, LIBRARY_FETCH_ALBUM_LIST_OF_AA_START, LIBRARY_FETCH_ALBUM_LIST_OF_AA_SUCCESS, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ALBUM_SUCCESS, 
        LIBRARY_FETCH_ALBUM_TRACKS_START, 
        LIBRARY_FETCH_ALBUM_TRACKS_SUCCESS, 
        LIBRARY_FETCH_ARTIST_LIST_START, LIBRARY_FETCH_ARTIST_LIST_SUCCESS, 
        LIBRARY_FETCH_MUSIC_PATH_START, 
        LIBRARY_FETCH_MUSIC_PATH_SUCCESS, 
        LIBRARY_FETCH_SONGS_BY_ARTIST_START, LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS, LIBrARY_INIT_BUILD_LIBRARY_START, LIBrARY_INIT_BUILD_LIBRARY_SUCESS, LIBRARY_SAVE_MUSIC_PATH_START, LIBRARY_SAVE_MUSIC_PATH_SUCCESS, LIBRARY_SEARCH_BY_KEY_START, LIBRARY_SEARCH_BY_KEY_SUCCESS, SET_GROUP_BAND 
    } from "./LibraryActionTypes";

export const fethAllSongs = () => ({
    type: FETCH_SONGS_START
})

export const fethAllSongsSucc = (tracks) => ({
    type:FETCH_SONGS_SUCCESS,
    tracks
})

export const fetchAllAlbums = () => ({
    type: LIBRARY_FETCH_ALBUMS_START
})

export const fetchAllAlbumsSucc = (albums) => ({
    type: LIBRARY_FETCH_ALBUMS_SUCCESS,
    albums
})

export const fetchAllAlbumsDtls = () => ({
    type: LIBRARY_FETCH_ALBUMS_DETAILS_START
})

export const fetchAllAlbumsDtlsSucc = (albumsDetails) => ({
    type: LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS,
    albumsDetails
})

export const fetchAlbumImgs = () => ({
    type:LIBRARY_FETCH_ALBUM_IMGS_START
})

export const fetchAlbumImgsScc = (albumImgs) => ({
    type: LIBRARY_FETCH_ALBUM_IMGS_SUCCESS,
    albumImgs
})

export const fetchAlbumTacks = (albumName) => ({
    type:LIBRARY_FETCH_ALBUM_TRACKS_START,
    albumName
})

export const fetchAlbumTacksSucc = (albumTracks) => ({
    type: LIBRARY_FETCH_ALBUM_TRACKS_SUCCESS,
    albumTracks
})

export const fetchAlbum = (albumName) => ({
    type:LIBRARY_FETCH_ALBUM_START,
    albumName
})

export const fetchAlbumSucc = (album) => ({
    type: LIBRARY_FETCH_ALBUM_SUCCESS,
    album
})

export const setGroupband = (groupBand) => ({
    type: SET_GROUP_BAND,
    groupBand
})

export const fetchAllArtistsDtls = (artistType) => ({
    type: LIBRARY_FETCH_ARTIST_LIST_START,
    artistType
})

export const fetchAllArtistsDtlsSucc = (artistsDetails) => ({
    type: LIBRARY_FETCH_ARTIST_LIST_SUCCESS,
    artistsDetails
})

export const fetchSongsByArtist = (artist) => ({
    type: LIBRARY_FETCH_SONGS_BY_ARTIST_START,
    artist
})

export const fetchSongsByArtistSucc = (artistTracks) => ({
    type: LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS,
    artistTracks
})

export const fetchAllAlbumArtistsDtls = (artistType) => ({
    type: LIBRARY_FETCH_ALBUM_ARTIST_LIST_START,
    artistType
})

export const fetchAllAlbumArtistsDtlsSucc = (albumArtistsDetails) => ({
    type: LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS,
    albumArtistsDetails
})

export const fetchAlbumlistOfAA = (albumArtist) => ({
    type: LIBRARY_FETCH_ALBUM_LIST_OF_AA_START,
    albumArtist
})

export const fetchAlbumlistOfAASucc = (albumListOfAA) => ({
    type: LIBRARY_FETCH_ALBUM_LIST_OF_AA_SUCCESS,
    albumListOfAA
})



//Side bar Library
export const initLibraryBuild = () => ({
    type: LIBrARY_INIT_BUILD_LIBRARY_START
})

export const initLibraryBuildSucc = (response) => ({
    type: LIBrARY_INIT_BUILD_LIBRARY_SUCESS,
    response
})

export const saveMusicPath = (musicPath) => ({
    type: LIBRARY_SAVE_MUSIC_PATH_START,
    musicPath
})

export const saveMusicPathSucc = (response) => ({
    type: LIBRARY_SAVE_MUSIC_PATH_SUCCESS,
    response
})

export const fetchMusicPath = (musicPath) => ({
    type: LIBRARY_FETCH_MUSIC_PATH_START,
    musicPath
})

export const fetchMusicPathSucc = (response) => ({
    type: LIBRARY_FETCH_MUSIC_PATH_SUCCESS,
    response
})

export const deleteMusicPath = (musicPath) =>({
    type:LIBRARY_DELETE_MUSIC_PATH_START,
    musicPath
})

export const deleteMusicPathSucc = (response, musicPath) =>({
    type:LIBRARY_DELETE_MUSIC_PATH_SUCCESS,
    response,
    musicPath
})

export const searchByKey = (searchKey) => ({
    type: LIBRARY_SEARCH_BY_KEY_START,
    searchKey
})

export const searchByKeySucc = (response) => ({
    type: LIBRARY_SEARCH_BY_KEY_SUCCESS,
    response
})

export const fetchAllHistory = () => ({
    type: HISTORY_FETCH_ALL_HISTORY_START
})

export const fetchAllHistorySucc = (response) => ({
    type: HISTORY_FETCH_ALL_HISTORY_SUCCESS,
    response
})


export const filterMusicPath = (response, musicPath,musicPaths) => {
    if(response.status===SUCCESS){
        musicPaths = musicPaths.filter(mPath => {return mPath.messageId!==musicPath.messageId});
    }
    return musicPaths;
}




