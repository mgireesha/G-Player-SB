import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAlbumlistOfAA, fetchAllAlbumArtistsDtls } from "../../redux/library/LibraryActions";
import { callWikiAPI, scrollToPlaying } from "../../utilities/util";
import { AlbumThumb } from "../album/AlbumThumb";
import { ALBUM_ARTIST, MULTI_GENRE, WIKI_SUMMARY_URL } from "../../redux/GPActionTypes";
import def_album_art from '../../images/def_album_art.png';

export const AlbumArtist = () => {
    const {albumArtist} = useParams();
    const dispatch = useDispatch();
    let albumListOfAA = useSelector(state => state.library.albumListOfAA);//AA -> Album Artist
    if(albumListOfAA.length>0){
        albumListOfAA = albumListOfAA.sort((a,b)=>{return a.year>b.year?-1:1});
    }
    const albumArtistsDetails = useSelector(state => state.library.albumArtistsDetails);
    const songPlaying = useSelector(state => state.player.songPlaying);
    const playedFrom = useSelector(state => state.player.playedFrom);
    const [artistWiki, setArtistWiki] = useState({});
    const [artistWikiImg, setArtistWikiImg] = useState(null);
    const [albumArtistObj, setAlbumArtistObj] = useState({});
    const [albumCount, setAlbumCount] = useState(0);
    
    useEffect(()=>{
        setArtistWikiImg(null);
        setArtistWiki({});
        dispatch(fetchAlbumlistOfAA(albumArtist));
        fetchArtistDetailsfromWiki(albumArtist);
    },[albumArtist]);

    useEffect(()=>{
        if(albumListOfAA){
            let tempAlbumCount = 0;
            albumListOfAA.forEach(element => {
                if(element.genreType === MULTI_GENRE){
                    tempAlbumCount+= element.genres.split(",").length;
                }else{
                    tempAlbumCount++;
                }
            });
            setAlbumCount(tempAlbumCount);
        }
    },[albumListOfAA])

    useEffect(()=>{
        if(albumArtistsDetails.length>0){
            setAlbumArtistObj(albumArtistsDetails.find(albumArtistObj => albumArtistObj.artistName===albumArtist));
        }else{
            dispatch(fetchAllAlbumArtistsDtls(ALBUM_ARTIST));
        }
    },[albumArtist, albumArtistsDetails]);

    const fetchArtistDetailsfromWiki =async(albumArtist) => {
        let searchedSingerActor = false;
        let data = await callWikiAPI(`${WIKI_SUMMARY_URL}${albumArtist}`);
        if(data.title.includes("Not Found") || data.title.includes("doesn't exist") || data.extract.includes("may refer to")){
            data = await callWikiAPI(`${WIKI_SUMMARY_URL}${albumArtist}_(singer)`);
            if(data.title.includes("Not Found") || data.title.includes("doesn't exist")){
                data = await callWikiAPI(`${WIKI_SUMMARY_URL}${albumArtist}_(actor)`);
                searchedSingerActor = true;
            }
        }
        if(!(data.extract.includes("singer") || data.extract.includes("director")
                        || data.extract.includes("actress") || data.extract.includes("actor")
                        || data.extract.includes("composer") || data.extract.includes("musician")
                        )){
            if(!searchedSingerActor){
                data = await callWikiAPI(`${WIKI_SUMMARY_URL}${albumArtist}_(singer)`);
                if(data.title.includes("Not Found") || data.title.includes("doesn't exist")){
                    data = await callWikiAPI(`${WIKI_SUMMARY_URL}${albumArtist}_(actor)`);
                }
            }else{
                data = null;
            }
        }
        setArtistWiki(data);
        if(data["thumbnail"]!==undefined){
            setArtistWikiImg(data.thumbnail.source);
        }
    }
    return(
        <div className="album-artist">
            <div className="album-artist-img-div-container">
                <div className="album-artist-img-div">
                    {albumArtistObj.imgAvl  && <img src={"/gp_images/artists/"+albumArtistObj.artistName+".jpg"} />}
                    {!albumArtistObj.imgAvl && artistWikiImg!==null &&  <img src={artistWikiImg} />}
                    {!albumArtistObj.imgAvl && artistWikiImg===null &&<img src={def_album_art} />}
                </div>
                <div className="album-artist-details">
                    <h3>{albumArtist}</h3>
                    <label>Albums: {albumCount}</label>
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