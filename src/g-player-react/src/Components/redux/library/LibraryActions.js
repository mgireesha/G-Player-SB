import { FETCH_SONGS_START, FETCH_SONGS_SUCCESS, 
        LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS, 
        LIBRARY_FETCH_ALBUMS_START, LIBRARY_FETCH_ALBUMS_SUCCESS, LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, 
        LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, 
        LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_SUCCESS, LIBRARY_FETCH_ALBUM_IMGS_START, 
        LIBRARY_FETCH_ALBUM_IMGS_SUCCESS, LIBRARY_FETCH_ALBUM_LIST_OF_AA_START, LIBRARY_FETCH_ALBUM_LIST_OF_AA_SUCCESS, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ALBUM_SUCCESS, 
        LIBRARY_FETCH_ALBUM_TRACKS_START, 
        LIBRARY_FETCH_ALBUM_TRACKS_SUCCESS, 
        LIBRARY_FETCH_ARTIST_LIST_START, LIBRARY_FETCH_ARTIST_LIST_SUCCESS, 
        LIBRARY_FETCH_SONGS_BY_ARTIST_START, LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS, SET_GROUP_BAND 
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



