import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAlbumDetailsByAlbumArtist, fetchAlbumlistOfAA, fetchAllAlbumArtistsDtls, setGroupband } from "../../redux/library/LibraryActions";
import { scrollToPlaying } from "../../utli";
import { AlbumThumb } from "../AlbumThumb";
import def_album_art from '../../images/def_album_art.png';
import { setPlayedFrom } from "../../redux/player/PlayerActions";
import { ALBUM_ARTIST } from "../../redux/GPActionTypes";

export const AlbumArtist = () => {
    const {albumArtist} = useParams();
    const dispatch = useDispatch();
    const albumListOfAA = useSelector(state => state.library.albumListOfAA);//AA -> Album Artist
    const albumArtistsDetails = useSelector(state => state.library.albumArtistsDetails);
    const [albumDtlsKeys, setAlbumDtlsKeys] = useState(null);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const albumImgs = useSelector(state => state.library.albumImgs);
    const [artistWiki, setArtistWiki] = useState({});
    const [artistWikiImg, setArtistWikiImg] = useState(null);
    const [albumArtistObj, setAlbumArtistObj] = useState({});
    
    useEffect(()=>{
        setAlbumDtlsKeys([]);
        setArtistWikiImg(null);
        setArtistWiki({});
        dispatch(fetchAlbumlistOfAA(albumArtist));
        fetchArtistDetailsfromWiki(albumArtist);
    },[albumArtist]);

    useEffect(()=>{
        if(albumArtistsDetails.length>0){
            setAlbumArtistObj(albumArtistsDetails.find(albumArtistObj => albumArtistObj.artistName===albumArtist));
        }else{
            dispatch(fetchAllAlbumArtistsDtls(ALBUM_ARTIST));
        }
    },[albumArtist, albumArtistsDetails]);

    useEffect(()=>{
        dispatch(setGroupband("album_artists"));
        dispatch(setPlayedFrom(ALBUM_ARTIST))
    },[]);

    const fetchArtistDetailsfromWiki =async(albumArtist) => {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${albumArtist}`);
        const data = await response.json();
        if(data['extract']!==undefined && (data['extract'].toLowerCase().includes('singer')
            || data['extract'].toLowerCase().includes('actor')) && !data['extract'].toLowerCase().includes('may refer to')){
            setArtistWiki(data);
            if(data["thumbnail"]!==undefined){
                setArtistWikiImg(data.thumbnail.source);
            }
        }
    }
    return(
        <div className="album-artist">
            <div className="album-artist-img-div-container">
                <div className="album-artist-img-div">
                    {albumArtistObj.imgAvl  && <img src={"/images/artists/"+albumArtistObj.artistName+".jpg"} />}
                    {!albumArtistObj.imgAvl && artistWikiImg!==null &&  <img src={artistWikiImg} />}
                    {!albumArtistObj.imgAvl && artistWikiImg===null &&<img src={def_album_art} />}
                </div>
                <div className="album-artist-details">
                    <h3>{albumArtist}</h3>
                    <label>Albums: {albumListOfAA.length}</label>
                    {playedFrom===ALBUM_ARTIST && songPlaying!==undefined && songPlaying!==null && songPlaying.albumArtist.includes(albumArtist) &&
                        <label>Playing:&nbsp;<i onClick={scrollToPlaying} style={{cursor:'pointer',color:'#ef6464'}}>{songPlaying.title}</i>&nbsp;<Link to={`/music/albums/${songPlaying.album}`}>{songPlaying.album!==null?'from '+songPlaying.album:''}</Link></label>
                    }
                    {artistWiki !==null && artistWiki!==undefined && artistWiki["extract"]!==undefined && 
                        <div className="album-artist-wiki-summary">
                            <p>{artistWiki["extract"]}</p>
                        </div>
                    }
                </div>
            </div>
            <div className="album-artist-album-list">
            {albumListOfAA.length>0 && albumListOfAA.map((album, index) =>
                <AlbumThumb album={album} key={index} />
            )}
        </div>
        </div>
    );
}