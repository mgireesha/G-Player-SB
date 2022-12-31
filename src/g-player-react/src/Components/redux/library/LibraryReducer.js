import { INIT, LOADING, SUCCESS } from "../GPActionTypes";
import { FETCH_SONGS_START, FETCH_SONGS_SUCCESS, LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS, LIBRARY_FETCH_ALBUMS_START, LIBRARY_FETCH_ALBUMS_SUCCESS, LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_SUCCESS, LIBRARY_FETCH_ALBUM_IMGS_START, LIBRARY_FETCH_ALBUM_IMGS_SUCCESS, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ALBUM_SUCCESS, LIBRARY_FETCH_ARTIST_LIST_START, LIBRARY_FETCH_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_SONGS_BY_ARTIST_START, LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS, SET_GROUP_BAND } from "./LibraryActionTypes";

export const initialState = {
    tracks:[],
    album:null,
    albums : null,
    albumImgs: null,
    albumsDetails:[],
    albumArtistAlbumsDetails:[],
    artistsDetails:[],
    //artistsImgsDetails:[],
    artistTracks:[],
    albumArtistsDetails:[],
    //albumArtistsImgsDetails:[],
    groupBand:"",
    phase:INIT
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_SONGS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_SONGS_SUCCESS:
            return{
                ...state,
                tracks:action.tracks.filter((track=>track.title!==null)),
                phase:SUCCESS
            }
        case LIBRARY_FETCH_ALBUMS_START:
            return{
                ...state,
                phase: LOADING
            }
        case LIBRARY_FETCH_ALBUMS_SUCCESS:
            return{
                ...state,
                albums:action.albums,
                phase:SUCCESS
            }
        case LIBRARY_FETCH_ALBUMS_DETAILS_START:
            return{
                ...state,
                phase: LOADING
            }
        case LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS:
            return{
                ...state,
                albumsDetails:action.albumsDetails,
                phase:SUCCESS
            }
        case LIBRARY_FETCH_ALBUM_IMGS_START:
            return{
                ...state,
                phase: LOADING
            }
        case LIBRARY_FETCH_ALBUM_IMGS_SUCCESS:
            return{
                ...state,
                albumImgs:action.albumImgs,
                phase:SUCCESS
            }
        case LIBRARY_FETCH_ALBUM_START:
            return{
                ...state,
                phase: LOADING
            }
        case LIBRARY_FETCH_ALBUM_SUCCESS:
            return{
                ...state,
                album:action.album,
                phase:SUCCESS
            }
        case SET_GROUP_BAND:
            return{
                ...state,
                groupBand: action.groupBand,
                phase:SUCCESS
            }
            case LIBRARY_FETCH_ARTIST_LIST_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_FETCH_ARTIST_LIST_SUCCESS:
                return{
                    ...state,
                    artistsDetails:action.artistsDetails,
                    //artistsImgsDetails:action.artistsImgsDetails,
                    phase:SUCCESS
                }
            case LIBRARY_FETCH_SONGS_BY_ARTIST_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS:
                return{
                    ...state,
                    artistTracks:action.artistTracks,
                    phase:SUCCESS
                }
            case LIBRARY_FETCH_ALBUM_ARTIST_LIST_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS:
                return{
                    ...state,
                    albumArtistsDetails:action.albumArtistsDetails,
                    //albumArtistsImgsDetails:action.albumArtistsImgsDetails,
                    phase:SUCCESS
                }
            case LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START:
                return{
                    ...state,
                    phase: LOADING

                }
            case LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_SUCCESS:
                return{
                    ...state,
                    albumArtistAlbumsDetails: action.albumArtistAlbumsDetails,
                    phase:SUCCESS
                }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default libraryReducer;