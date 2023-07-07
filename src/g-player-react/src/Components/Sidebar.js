import React, { useEffect, useState } from "react";
import {IoIosMusicalNotes} from 'react-icons/io';
import {IoTimeOutline} from 'react-icons/io5';
import {MdLibraryMusic} from 'react-icons/md'
import { Link, useLocation } from "react-router-dom";
import { LIBRARY, MUSIC, RECENT } from "./redux/GPActionTypes";
import { SearchInput } from "./search/SearchInput";

export const Sidebar = () => {
    const [selectedRow, setSelectedRow] = useState('');
    const locationL = useLocation();
    useEffect(()=>{
        let uri = locationL.pathname;
        if(uri!==null && uri!==''){
            if(uri.startsWith("/music")){
                setSelectedRow(MUSIC);
            }else if(uri.startsWith("/recent")){
                setSelectedRow(RECENT);
            }else if(uri.startsWith("/library")){
                setSelectedRow(LIBRARY);
            }
        }
    },[locationL]);
    return(
        <div className="sidebar">
            <div className="search-row">
                <SearchInput />
            </div>
            <div className={selectedRow===MUSIC?"row sidebar-slected-row":"row"}>
                <Link to='/music'>
                    <label><span><IoIosMusicalNotes className="icon" /></span><span>Music</span></label>
                </Link>
            </div>
            <div className={selectedRow===RECENT?"row sidebar-slected-row":"row"}>
                <Link to='/recent'>
                    <label><span><IoTimeOutline className="icon" /></span><span>Recent Plays</span></label>
                </Link>
            </div>
            <div className={selectedRow===LIBRARY?"row sidebar-slected-row":"row"}>
                <Link to='/library'>
                    <label><span><MdLibraryMusic className="icon" /></span><span>Library</span></label>
                </Link>
            </div>
        </div>
    );
}