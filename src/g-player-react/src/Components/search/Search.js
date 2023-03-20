import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../header/Header";
import { SEARCH_RESULTS_LABEL, TRACK_LIST } from "../redux/GPActionTypes";
import { searchByKey } from "../redux/library/LibraryActions";
import { AlbumThumb } from "../screen/AlbumThumb";
import { AlbumArtistThumb } from "../screen/artist/AlbumArtistThumb";
import { ArtistThumb } from "../screen/artist/ArtistThumb";
import { Track } from "../screen/Track";

export const Search = () => {
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.library.searchResult);
    const { searchKey } = useParams();
    useEffect(()=>{
        
        if(searchKey!==null && searchKey!==undefined){
            dispatch(searchByKey(searchKey));
        }
    },[searchKey])
    return(
        <div className="search">
            <Header headerLbl={SEARCH_RESULTS_LABEL} />
            <div className="body">
                {searchResult!==undefined && Object.keys(searchResult).length>0 &&
                    <>
                        {searchResult.ALBUMS.length>0 &&
                            <>
                                <h3>Albums</h3>
                                <div className="search-result-album-list">
                                    {searchResult.ALBUMS.map((album, index) =>
                                        <AlbumThumb album={album} key={index} />
                                    )}
                                </div>
                            </>
                        }
                        {searchResult.ALBUM_ARTISTS.length>0 && 
                            <>
                                <h3>Album Artists</h3>
                                <div className="search-result-album-artists-list">
                                    {searchResult.ALBUM_ARTISTS.map((albumArtist, index) =>
                                        <AlbumArtistThumb albumArtist={albumArtist} key={index} />
                                    )}
                                </div>
                            </>
                        }
                        {searchResult.ARTISTS.length>0 &&
                            <>
                                <h3>Artists</h3>
                                <div className="search-result-artists-list">
                                    {searchResult.ARTISTS.map((artist, index) =>
                                        <ArtistThumb artist={artist} key={index} />
                                    )}
                                </div>
                            </>
                        }
                        {searchResult.TRACK_LIST.length>0 &&
                            <>
                                <h3>Tracks</h3>
                                <div className="search-result-track-list">
                                    {searchResult.TRACK_LIST.map((track, index)=>
                                        <Track track={track} key={track.songId} playedFrom={TRACK_LIST} index={index} />
                                    )}
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    );
}