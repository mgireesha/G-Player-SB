import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A_TO_Z_DESC, CURRENT_PAGE, GP_ALBUMS_SORT_FIELD_MAPPING, LANGUAGE, MULTI_LINGUAL, NONE, NO_SORT, SOME_PAGE, SORT_ARTIST, SORT_NONE, SORT_YEAR } from "../../redux/GPActionTypes";
import { fetchAllAlbums } from "../../redux/library/LibraryActions";
import { replace_AndCamelize, setCookies, sortGroupByField } from "../../utilities/util";
import { AlbumThumb } from "./AlbumThumb";
import { SortingContainer } from "../SortingContainer";

export const AlbumList = ({albums, albumListInp}) => {

    const globalFilterText = useSelector(state => state.library.globalFilterText);
    
    const [sortedAlbums, setSortedAlbums] = useState({});
    const [filteredAlbums, setFilteredAlbums] = useState({});
    const [albumListKeys, setAlbumListKeys] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_YEAR);
    const [isFilterActive, setFilterActive] = useState(false);

    useEffect(()=>{
        setCookies(CURRENT_PAGE, JSON.stringify({type:SOME_PAGE}));
    },[]);

    useEffect(()=>{
        if(sortBy && albums.length>0){
            setAlbumListKeys([]);
            setSortedAlbums(sortGroupByField(albums,GP_ALBUMS_SORT_FIELD_MAPPING[sortBy]))
        }
    },[sortBy]);

    useEffect(()=>{
        albumListInp && albumListInp.selectedSortBy ? setSortBy(albumListInp.selectedSortBy) : setSortBy(NO_SORT);
    },[albumListInp])

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
        <div className="album-list">
            {albumListInp.showSort && !isFilterActive && <SortingContainer sortListKeys={albumListKeys} showLKey={albumListInp.showLKey} setSortBy={setSortBy} sortBy={sortBy} sortSelectors={albumListInp.sortSelectors} showSortByLabel={albumListInp.showSortByLabel} />}
            <div className="albums" style={albumListInp.styles?albumListInp.styles:{}}>
                {albumListKeys !== undefined && albumListKeys.length > 0 && albumListKeys.map((lKey, index) =>
                        <>
                            {!isFilterActive && albumListInp.showLKey && <label id={"lKey" + lKey} className="album-lKey">{replace_AndCamelize(lKey)}</label>}
                            {filteredAlbums[lKey] !== undefined && filteredAlbums[lKey].length > 0 && filteredAlbums[lKey].map((album, albumIndex) =>
                                <AlbumThumb album={album} key={albumIndex} />
                            )}
                        </>
                )}
            </div>
        </div>
    );
}