import React from "react";
import {IoIosMusicalNotes} from 'react-icons/io';
import {IoTimeOutline} from 'react-icons/io5';
import {MdLibraryMusic} from 'react-icons/md'
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="row">
                <Link to='/music'>
                    <label><span><IoIosMusicalNotes className="icon" /></span><span>Music</span></label>
                </Link>
            </div>
            <div className="row">
                <Link to='/recent'>
                    <label><span><IoTimeOutline className="icon" /></span><span>Recent Plays</span></label>
                </Link>
            </div>
            <div className="row">
                <Link to='/library'>
                    <label><span><MdLibraryMusic className="icon" /></span><span>Library</span></label>
                </Link>
            </div>
        </div>
    );
}