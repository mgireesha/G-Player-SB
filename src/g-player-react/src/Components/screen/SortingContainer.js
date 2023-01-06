import React from "react";
import { A_TO_Z, SORT_ARTIST, SORT_COUNT_ALBUMS, SORT_YEAR } from "../redux/GPActionTypes";
import { scrolltoId } from "../utli";

export const SortingContainer = ({sortBy, setSortBy, sortListKeys, sortSelectors}) => {
    return(
        <>
            <div className="order-container">
                <span>Sort By:</span>
                <select onChange={(event)=>setSortBy(event.target.value)} className="sortby">
                    {sortSelectors.includes(A_TO_Z) && <option value={A_TO_Z} selected={sortBy===A_TO_Z?true:false}>{A_TO_Z}</option>}
                    {sortSelectors.includes(SORT_YEAR) && <option value={SORT_YEAR} selected={sortBy===SORT_YEAR?true:false}>{SORT_YEAR}</option>}
                    {sortSelectors.includes(SORT_YEAR) && <option value={SORT_ARTIST} selected={sortBy===SORT_ARTIST?true:false}>{SORT_ARTIST}</option>}
                    {sortSelectors.includes(SORT_COUNT_ALBUMS) && <option value={SORT_COUNT_ALBUMS} selected={sortBy===SORT_COUNT_ALBUMS?true:false}>{SORT_COUNT_ALBUMS}</option>}
                </select>
            </div>
            <div className="lKey-line">
                {sortBy!==SORT_ARTIST && sortListKeys !== undefined && sortListKeys.length > 0 && sortListKeys.map((lKey, index) =>
                    <span onClick={() => scrolltoId("lKey" + lKey)} className={lKey.length>8?sortBy+"_25":sortBy+"_10"}>{lKey}</span>
                )}
            </div>
        </>
    );
}