import React from "react";
import { A_TO_Z, A_TO_Z_DESC, SORT_ARTIST, SORT_COUNT_ALBUMS, SORT_COUNT_TRACKS, SORT_YEAR } from "../redux/GPActionTypes";
import { scrolltoId } from "../utli";

export const SortingContainer = ({sortBy, setSortBy, sortListKeys, sortSelectors, showLKey}) => {
    return(
        <>
            <div className="order-container">
                <span>Sort By:</span>
                <select onChange={(event)=>setSortBy(event.target.value)} className="sortby">
                    {sortSelectors.includes(A_TO_Z) && <option value={A_TO_Z} selected={sortBy===A_TO_Z?true:false}>{A_TO_Z}</option>}
                    {sortSelectors.includes(A_TO_Z_DESC) && <option value={A_TO_Z_DESC} selected={sortBy===A_TO_Z_DESC?true:false}>{A_TO_Z_DESC}</option>}
                    {sortSelectors.includes(SORT_YEAR) && <option value={SORT_YEAR} selected={sortBy===SORT_YEAR?true:false}>{SORT_YEAR}</option>}
                    {sortSelectors.includes(SORT_YEAR) && <option value={SORT_ARTIST} selected={sortBy===SORT_ARTIST?true:false}>{SORT_ARTIST}</option>}
                    {sortSelectors.includes(SORT_COUNT_ALBUMS) && <option value={SORT_COUNT_ALBUMS} selected={sortBy===SORT_COUNT_ALBUMS?true:false}>{SORT_COUNT_ALBUMS}</option>}
                    {sortSelectors.includes(SORT_COUNT_TRACKS) && <option value={SORT_COUNT_TRACKS} selected={sortBy===SORT_COUNT_TRACKS?true:false}>{SORT_COUNT_TRACKS}</option>}
                </select>
            </div>
            {showLKey && <div className="lKey-line">
                {sortBy!==SORT_ARTIST && sortListKeys !== undefined && sortListKeys.length > 0 && sortListKeys.map((lKey, index) =>
                    <span onClick={() => scrolltoId("lKey" + lKey)} className={lKey.length>8?sortBy+"_25":sortBy+"_10"}>{lKey}</span>
                )}
            </div>}
        </>
    );
}