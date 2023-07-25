import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, SOME_PAGE, SORT_ARTIST, SORT_YEAR } from "../../redux/GPActionTypes";
import { fetchAllAlbums } from "../../redux/library/LibraryActions";
import { setCookies, sortGroupByField } from "../../utilities/util";
import { AlbumThumb } from "./AlbumThumb";
import { SortingContainer } from "../SortingContainer";
import { Spinner } from "../../utilities/Spinner";

export const AlbumList = () => {
    const dispatch = useDispatch();
    let albums = useSelector(state => state.library.albums);
    const [albumList, setAlbumList] = useState({});
    const [albumListKeys, setAlbumListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_YEAR);
    //const [albumDtlsKeys, setAlbumDtlsKeys] = useState(null);
    
    //const albumImgs = useSelector(state => state.library.albumImgs);

     useEffect(()=>{
         if(albums===null){
            dispatch(fetchAllAlbums());
         }
     },[albums]);

    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:SOME_PAGE}));
    },[]);

    useEffect(()=>{
        if(albums.length>0){
            if(sortBy===A_TO_Z || sortBy===A_TO_Z_DESC){
                setAlbumList(sortGroupByField(albums,'albumName'));
            }else if(sortBy===SORT_YEAR){
                setAlbumList(sortGroupByField(albums,'year'))
            }else if(sortBy===SORT_ARTIST){
                setAlbumList(sortGroupByField(albums,'albumArtist'))
            }
        }
    },[albums, sortBy])

    useEffect(()=>{
        if(Object.keys(albumList).length>0){
            let tempAlbumListKeys = Object.keys(albumList);
            if(sortBy===SORT_YEAR || sortBy===A_TO_Z_DESC){
                tempAlbumListKeys = tempAlbumListKeys.sort((a,b)=>{return a>b?-1:1});
            }
            if(sortBy===SORT_ARTIST){
                tempAlbumListKeys = tempAlbumListKeys.sort((a,b)=>{return a>b?1:-1});
            }
            setAlbumListKeys(tempAlbumListKeys);
        }
    },[albumList])

    return(
        <>
            <div className="album-list-container">
                <SortingContainer sortListKeys={albumListKeys} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[A_TO_Z,A_TO_Z_DESC,SORT_YEAR,SORT_ARTIST]} />
                <div className="album-list">
                {/* {albums!==null && albums.length>0 && albums.map((album, index) =>
                    <AlbumThumb album={album} key={index} />
                )} */}
                {albumListKeys !== undefined && albumListKeys.length > 0 && albumListKeys.map((lKey, index) =>
                        <>
                            <label id={"lKey" + lKey} className="album-lKey">{lKey}</label>
                            {albumList[lKey] !== undefined && albumList[lKey].length > 0 && albumList[lKey].map((album, albumIndex) =>
                                <AlbumThumb album={album} key={albumIndex} />
                            )}
                        </>
                )}
                </div> 
            </div>
            <Spinner />
        </>
    );
}