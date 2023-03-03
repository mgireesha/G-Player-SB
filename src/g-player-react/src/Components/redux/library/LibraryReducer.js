import { INIT, LOADING, SUCCESS } from "../GPActionTypes";
import { filterMusicPath, sortAZ } from "./LibraryActions";
import { FETCH_SONGS_START, FETCH_SONGS_SUCCESS, HISTORY_FETCH_ALL_HISTORY_START, HISTORY_FETCH_ALL_HISTORY_SUCCESS, LIBRARY_DELETE_MUSIC_PATH_START, LIBRARY_DELETE_MUSIC_PATH_SUCCESS, LIBRARY_FETCH_ALBUMS_DETAILS_START, LIBRARY_FETCH_ALBUMS_DETAILS_SUCCESS, LIBRARY_FETCH_ALBUMS_START, LIBRARY_FETCH_ALBUMS_SUCCESS, LIBRARY_FETCH_ALBUM_ARTIST_LIST_START, LIBRARY_FETCH_ALBUM_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_START, LIBRARY_FETCH_ALBUM_DETAILS_BY_ALBUM_ARTIST_SUCCESS, LIBRARY_FETCH_ALBUM_IMGS_START, LIBRARY_FETCH_ALBUM_IMGS_SUCCESS, LIBRARY_FETCH_ALBUM_LIST_OF_AA_START, LIBRARY_FETCH_ALBUM_LIST_OF_AA_SUCCESS, LIBRARY_FETCH_ALBUM_START, LIBRARY_FETCH_ALBUM_SUCCESS, LIBRARY_FETCH_ALBUM_TRACKS_START, LIBRARY_FETCH_ALBUM_TRACKS_SUCCESS, LIBRARY_FETCH_ARTIST_LIST_START, LIBRARY_FETCH_ARTIST_LIST_SUCCESS, LIBRARY_FETCH_BUILD_STATUS_START, LIBRARY_FETCH_BUILD_STATUS_SUCCESS, LIBRARY_FETCH_MOST_PLAYED_DATA_START, LIBRARY_FETCH_MOST_PLAYED_DATA_SUCCESS, LIBRARY_FETCH_MUSIC_PATH_START, LIBRARY_FETCH_MUSIC_PATH_SUCCESS, LIBRARY_FETCH_SONGS_BY_ARTIST_START, LIBRARY_FETCH_SONGS_BY_ARTIST_SUCCESS, LIBRARY_SAVE_MUSIC_PATH_START, LIBRARY_SAVE_MUSIC_PATH_SUCCESS, LIBRARY_SEARCH_BY_KEY_START, LIBRARY_SEARCH_BY_KEY_SUCCESS, SET_GROUP_BAND } from "./LibraryActionTypes";

export const initialState = {
    tracks:[],
    albumTracks:[],
    album:{},
    albums : [],
    albumImgs: null,
    albumsDetails:[],
    albumListOfAA:[],
    artistsDetails:[],
    artistTracks:[],
    albumArtistsDetails:[],
    musicPaths:[],
    searchResult:{},
    history:[],
    buildStatus:[],
    mostPlayedData: {},
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
        case LIBRARY_FETCH_ALBUM_TRACKS_START:
            return{
                ...state,
                phase: LOADING
            }
        case LIBRARY_FETCH_ALBUM_TRACKS_SUCCESS:
            return{
                ...state,
                albumTracks:action.albumTracks,
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
            case LIBRARY_FETCH_ALBUM_LIST_OF_AA_START:
                return{
                    ...state,
                    phase: LOADING

                }
            case LIBRARY_FETCH_ALBUM_LIST_OF_AA_SUCCESS:
                return{
                    ...state,
                    albumListOfAA: action.albumListOfAA,
                    phase:SUCCESS
                }
            case LIBRARY_SAVE_MUSIC_PATH_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_SAVE_MUSIC_PATH_SUCCESS:
                return{
                    ...state,
                    musicPaths: [...state.musicPaths, action.response],
                    phase:LIBRARY_SAVE_MUSIC_PATH_SUCCESS
                }
            case LIBRARY_FETCH_MUSIC_PATH_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_FETCH_MUSIC_PATH_SUCCESS:
                return{
                    ...state,
                    musicPaths: action.response,
                    phase:SUCCESS
                }
            case LIBRARY_DELETE_MUSIC_PATH_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_DELETE_MUSIC_PATH_SUCCESS:
                return{
                    ...state,
                    musicPaths: filterMusicPath(action.response, action.musicPath, [...state.musicPaths]),
                    phase:SUCCESS
                }
            case LIBRARY_SEARCH_BY_KEY_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case LIBRARY_SEARCH_BY_KEY_SUCCESS:
                return{
                    ...state,
                    searchResult: action.response,
                    phase:SUCCESS
                }
            case HISTORY_FETCH_ALL_HISTORY_START:
                return{
                    ...state,
                    phase: LOADING
                }
            case HISTORY_FETCH_ALL_HISTORY_SUCCESS:
                return{
                    ...state,
                    history: action.response,
                    phase:SUCCESS
                }
            case LIBRARY_FETCH_BUILD_STATUS_START:
                    return{
                        ...state,
                        phase: LOADING
                    }
            case LIBRARY_FETCH_BUILD_STATUS_SUCCESS:
                    return{
                        ...state,
                        buildStatus: action.response,
                        phase:SUCCESS
                    }
            case LIBRARY_FETCH_MOST_PLAYED_DATA_START:
                    return{
                        ...state,
                        phase: LOADING
                    }
            case LIBRARY_FETCH_MOST_PLAYED_DATA_SUCCESS:
                    return{
                        ...state,
                        mostPlayedData: action.response,
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