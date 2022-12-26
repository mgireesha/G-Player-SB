import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbums, fetchAllAlbumsDtls, setGroupband } from "../redux/library/LibraryActions";
import { AlbumThumb } from "./AlbumThumb";

export const AlbumList = () => {
    // useState(()=>{
    //     const getAls = async() =>{
    //         const response = await fetch('http://localhost:8080/library/getAllAlbums');
    //         const data = await response.json();
    //         setAlbums(data);
    //         console.log("keys: ",Object.keys(data));
    //         setkeys(Object.keys(data));
    //     }
    //     getAls();
    // },[]);
    const dispatch = useDispatch();
    const albumsDetails = useSelector(state => state.library.albumsDetails);
    const [albumDtlsKeys, setAlbumDtlsKeys] = useState(null);
    
    const albumImgs = useSelector(state => state.library.albumImgs);

    useEffect(()=>{
        if(albumsDetails!==null){
            setAlbumDtlsKeys(Object.keys(albumsDetails));
        }
    },[albumsDetails]);

    useEffect(()=>{
        dispatch(setGroupband("albums"));
    },[]);

    return(
        <div className="album-list">
            {albumsDetails!==null && albumDtlsKeys!==null && albumDtlsKeys.length>0 && albumImgs!==null && albumDtlsKeys.map(albumName =>
                <AlbumThumb album={albumsDetails[albumName]} albumImg={albumImgs[albumName]} key={albumName} />
            )}
        </div>
    );
}