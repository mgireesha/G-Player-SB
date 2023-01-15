import React from "react";
import { Route, Routes } from "react-router-dom";
import { Album } from "./Album";
import { AlbumArtistList } from "./artist/AlbumArtistList";
import { AlbumList } from "./AlbumList";
import { Artist } from "./artist/Artist";
import { ArtistsList } from "./artist/ArtistsList";
import { GroupBand } from "./GroupBand";
import { TrackList } from "./TrackList";
import { AlbumArtist } from "./artist/AlbumArtist";
import { Music } from "./Music";

export const Screen = () => {
    return(
        <div className="screen">
            <div className="header">
                <h1 style={{fontWeight:'500'}}>Music</h1>
            </div>
            <GroupBand />
            <Routes>
                <Route path='/' element={<Music />} />
                <Route path='tracks' element={<TrackList />} />
                <Route path='tracks' element={<TrackList />} />
                <Route path='albums/:albumName' element={<Album />} />
                <Route path='albums' element={<AlbumList />} />
                <Route path='artists/:artist' element={<Artist />} />
                <Route path='artists' element={<ArtistsList />} />
                <Route path='album_artists/:albumArtist' element={<AlbumArtist />} />
                <Route path='album_artists' element={<AlbumArtistList />} />
            </Routes>
        </div>
    );
}