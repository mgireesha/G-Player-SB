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

export const Screen = () => {
    return(
        <div className="screen">
            <div className="header">
                <h1 style={{fontWeight:'500'}}>Music</h1>
            </div>
            <GroupBand />
                <Routes>
                    <Route path='/music/tracks' element={<TrackList />} />
                    <Route path='/music/albums/:albumName' element={<Album />} />
                    <Route path='/music/albums' element={<AlbumList />} />
                    <Route path='/music/artists/:artist' element={<Artist />} />
                    <Route path='/music/artists' element={<ArtistsList />} />
                    <Route path='/music/album_artists/:albumArtist' element={<AlbumArtist />} />
                    <Route path='/music/album_artists' element={<AlbumArtistList />} />
                </Routes>
        </div>
    );
}