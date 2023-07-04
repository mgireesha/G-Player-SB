import React from "react";
import { Route, Routes } from "react-router-dom";
import { AlbumArtistList } from "./artist/AlbumArtistList";
import { AlbumList } from "./album/AlbumList";
import { Artist } from "./artist/Artist";
import { ArtistsList } from "./artist/ArtistsList";
import { AlbumArtist } from "./artist/AlbumArtist";
import { Music } from "./Music";
import { Header } from "../header/Header";
import { MUSIC_LABEL } from "../redux/GPActionTypes";
import { Tracks } from "./track/Tracks";
import { Album } from "./album/Album";

export const Screen = () => {
    return(
        <div className="screen">
            <Header showGB={true} linkTO="/music" headerLbl={MUSIC_LABEL} />
            <Routes>
                <Route path='/' element={<Music />} />
                <Route path='tracks' element={<Tracks />} />
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