import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbums, fetchAllAlbumsDtls, setGroupband } from "../redux/library/LibraryActions";
import { AlbumThumb } from "./AlbumThumb";
import { Spinner } from "./Spinner";

export const AlbumList = () => {
    const dispatch = useDispatch();
    let albums = useSelector(state => state.library.albums);
    if(albums.length>0){
        albums = albums.sort((a,b)=>a.albumName>b.albumName?1:-1);
    }
    //const [albumDtlsKeys, setAlbumDtlsKeys] = useState(null);
    
    //const albumImgs = useSelector(state => state.library.albumImgs);

     useEffect(()=>{
         if(albums===null){
            dispatch(fetchAllAlbums());
         }
     },[albums]);

    useEffect(()=>{
        dispatch(setGroupband("albums"));

    },[]);

    return(
        <>
            <div className="album-list">
            {albums!==null && albums.length>0 && albums.map((album, index) =>
                <AlbumThumb album={album} key={index} />
            )}
            </div>
            <Spinner />
        </>
    );
}