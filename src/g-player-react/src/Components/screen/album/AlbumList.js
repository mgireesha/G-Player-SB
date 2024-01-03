import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z, A_TO_Z_DESC, CURRENT_PAGE, LANGUAGE, MULTI_LINGUAL, SOME_PAGE, SORT_ARTIST, SORT_YEAR } from "../../redux/GPActionTypes";
import { fetchAllAlbums } from "../../redux/library/LibraryActions";
import { camelize, replace_AndCamelize, setCookies, sortGroupByField } from "../../utilities/util";
import { AlbumThumb } from "./AlbumThumb";
import { SortingContainer } from "../SortingContainer";
import { Spinner } from "../../utilities/Spinner";

export const AlbumList = () => {
    const dispatch = useDispatch();

    let albums = useSelector(state => state.library.albums);
    const globalFilterText = useSelector(state => state.library.globalFilterText);
    
    const [sortedAlbums, setSortedAlbums] = useState({});
    const [filteredAlbums, setFilteredAlbums] = useState({});
    const [albumListKeys, setAlbumListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_YEAR);
    const [isFilterActive, setFilterActive] = useState(false);

     useEffect(()=>{
         if(albums.length === 0){
            dispatch(fetchAllAlbums());
         }
     },[albums]);

    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:SOME_PAGE}));
    },[]);

    useEffect(()=>{
        if(albums.length>0){
            if(sortBy===A_TO_Z || sortBy===A_TO_Z_DESC){
                setSortedAlbums(sortGroupByField(albums,'albumName'));
            }else if(sortBy===SORT_YEAR){
                setSortedAlbums(sortGroupByField(albums,'year'))
            }else if(sortBy===SORT_ARTIST){
                setSortedAlbums(sortGroupByField(albums,'albumArtist'))
            }else if(sortBy===LANGUAGE){
                setSortedAlbums(sortGroupByField(albums,'language'))
            }else if(sortBy===MULTI_LINGUAL){
                setSortedAlbums(sortGroupByField(albums,'languageType'))
            }
        }
    },[albums, sortBy])

    useEffect(()=>{
        if(Object.keys(sortedAlbums).length>0){
            let tempAlbumListKeys = Object.keys(sortedAlbums);
            if(sortBy===SORT_YEAR || sortBy===A_TO_Z_DESC){
                tempAlbumListKeys = tempAlbumListKeys.sort((a,b)=>{return a>b?-1:1});
            }
            if(sortBy===SORT_ARTIST){
                tempAlbumListKeys = tempAlbumListKeys.sort((a,b)=>{return a>b?1:-1});
            }
            setAlbumListKeys(tempAlbumListKeys);
            setFilteredAlbums(sortedAlbums);
        }
    },[sortedAlbums])

    useEffect(() => {
        //console.log("globalFilterText",globalFilterText)
        if (globalFilterText && globalFilterText.length > 2) {
            let tempFilteredAlbums = [];
            let filteredAlbums = {};
            albumListKeys.forEach(lKey =>{
                tempFilteredAlbums = sortedAlbums[lKey];
                tempFilteredAlbums = tempFilteredAlbums.filter(album => {
                    return album.albumName.toLowerCase().includes(globalFilterText)
                        || album.year === globalFilterText
                        || album.genre.toLowerCase().includes(globalFilterText)
                        || album.albumArtist.toLowerCase().includes(globalFilterText)
                });
                filteredAlbums[lKey] = tempFilteredAlbums;
            })
            setFilteredAlbums(filteredAlbums);
            setFilterActive(true);
        } else {
            setFilteredAlbums(sortedAlbums)
            setFilterActive(false);
        }
    }, [globalFilterText,albumListKeys]);

    return(
        <>
            <div className="album-list-container">
                {!isFilterActive && <SortingContainer sortListKeys={albumListKeys} showLKey={true} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={[A_TO_Z,A_TO_Z_DESC,SORT_YEAR,SORT_ARTIST,LANGUAGE,MULTI_LINGUAL]} showSortByLabel={true} />}
                <div className="album-list">
                {/* {albums!==null && albums.length>0 && albums.map((album, index) =>
                    <AlbumThumb album={album} key={index} />
                )} */}
                {albumListKeys !== undefined && albumListKeys.length > 0 && albumListKeys.map((lKey, index) =>
                        <>
                            {!isFilterActive && <label id={"lKey" + lKey} className="album-lKey">{replace_AndCamelize(lKey)}</label>}
                            {filteredAlbums[lKey] !== undefined && filteredAlbums[lKey].length > 0 && filteredAlbums[lKey].map((album, albumIndex) =>
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