import React from "react";
import { ALBUM, ALBUM_LABEL, A_TO_Z, A_TO_Z_DESC, GENRE, GENRE_LABEL, LANGUAGE, LANGUAGE_LABEL, LYRICS_AVAILABLE, LYRICS_AVAILABLE_LABEL, MULTI_LINGUAL, MULTI_LINGUAL_LABEL, SORT_ARTIST, SORT_COUNT_ALBUMS, SORT_COUNT_TRACKS, SORT_YEAR, TRACK_NUMBER, TRACK_NUMBER_LABEL } from "../redux/GPActionTypes";
import { replace_AndCamelize, scrolltoId } from "../utilities/util";

export const SortingContainer = ({sortBy, setSortBy, sortListKeys, sortSelectors, showLKey, showSortByLabel}) => {
    return(
        <>
            <div className="order-container">
                {showSortByLabel && <span>Sort By:</span>}
                <select onChange={(event)=>setSortBy(event.target.value)} className="sortby">
                    {sortSelectors.includes(A_TO_Z) && <option value={A_TO_Z} selected={sortBy===A_TO_Z?true:false}>{A_TO_Z}</option>}
                    {sortSelectors.includes(A_TO_Z_DESC) && <option value={A_TO_Z_DESC} selected={sortBy===A_TO_Z_DESC?true:false}>{A_TO_Z_DESC}</option>}
                    {sortSelectors.includes(SORT_YEAR) && <option value={SORT_YEAR} selected={sortBy===SORT_YEAR?true:false}>{SORT_YEAR}</option>}
                    {sortSelectors.includes(SORT_ARTIST) && <option value={SORT_ARTIST} selected={sortBy===SORT_ARTIST?true:false}>{SORT_ARTIST}</option>}
                    {sortSelectors.includes(SORT_COUNT_ALBUMS) && <option value={SORT_COUNT_ALBUMS} selected={sortBy===SORT_COUNT_ALBUMS?true:false}>{SORT_COUNT_ALBUMS}</option>}
                    {sortSelectors.includes(SORT_COUNT_TRACKS) && <option value={SORT_COUNT_TRACKS} selected={sortBy===SORT_COUNT_TRACKS?true:false}>{SORT_COUNT_TRACKS}</option>}
                    {sortSelectors.includes(TRACK_NUMBER) && <option value={TRACK_NUMBER} selected={sortBy===TRACK_NUMBER?true:false}>{TRACK_NUMBER_LABEL}</option>}
                    {sortSelectors.includes(LYRICS_AVAILABLE) && <option value={LYRICS_AVAILABLE} selected={sortBy===LYRICS_AVAILABLE?true:false}>{LYRICS_AVAILABLE_LABEL}</option>}
                    {sortSelectors.includes(MULTI_LINGUAL) && <option value={MULTI_LINGUAL} selected={sortBy===MULTI_LINGUAL?true:false}>{MULTI_LINGUAL_LABEL}</option>}
                    {sortSelectors.includes(LANGUAGE) && <option value={LANGUAGE} selected={sortBy===LANGUAGE?true:false}>{LANGUAGE_LABEL}</option>}
                    {sortSelectors.includes(GENRE) && <option value={GENRE} selected={sortBy===GENRE?true:false}>{GENRE_LABEL}</option>}
                    {sortSelectors.includes(ALBUM) && <option value={ALBUM} selected={sortBy===ALBUM?true:false}>{ALBUM_LABEL}</option>}
                </select>
            </div>
            {showLKey && <div className="lKey-line">
                {sortBy!==SORT_ARTIST && sortBy!==ALBUM && sortListKeys !== undefined && sortListKeys.length > 0 && sortListKeys.map((lKey, index) =>
                    <span key={index} onClick={() => scrolltoId("lKey" + lKey)} className={lKey.length>8?sortBy+"_25":sortBy+"_10"}>{replace_AndCamelize(lKey)}</span>
                )}
            </div>}
        </>
    );
}