import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArtistLink = ({artist}) => {
    const [artists, setArtists] = useState([]);
    useEffect(()=>{
        let artistArr = [artist];
        let splitters = [",",";","&"];
        let tempArtists=[];
        if(artist!==null && artist!==undefined){
            splitters.forEach(splitter =>{
                artistArr = filterArtistList(artistArr, splitter);
            });
            setArtists(artistArr);
        }
    },[artist]);

    const filterArtistList = (artistArr, splitter) => {
        let artistArr1 = [];
        let artist = null;
        for(var i=0;i<artistArr.length;i++){
            artist = artistArr[i].trim();
            if(artist.includes(splitter)){
                artistArr = artist.split(splitter);
                artistArr.forEach(artist1=>{
                    if(!artistArr1.includes(artist1)){
                        artistArr1.push(artist1);
                    }
                });
            }else{
                artistArr1.push(artist);
            }
        }
        artistArr1 = artistArr1.filter((item, 
            index) => artistArr1.indexOf(item) === index);
        return artistArr1;
    }

    return(
        <>
        {artists!==null && artists!==undefined && artists.map((artist,index)=>
            <span key={index}>
                <span key={index+'deli'}>{index===0?'':', '}</span><Link className="artist-link" to={`/music/artists/${artist}`} key={index}>{artist}</Link>
            </span>    
        )}
        </>
    );
}