import React from "react";
import { Link } from "react-router-dom";
import { GroupBand } from "../screen/GroupBand";
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { showHideSideBar } from "../utilities/util";

export const Header = ({showGB, linkTO, headerLbl}) => {
    return(
        <div className="header-container">
            <div className="header">
                <div className="mobile-only-block">
                    <AiOutlineMenuUnfold  onClick={showHideSideBar} id="MenuSideBarUnFold" />
                </div>
                {linkTO!==undefined ? 
                    <h1><Link to={linkTO}>{headerLbl}</Link></h1>
                    :
                    <h1>{headerLbl}</h1>
                }
            </div>
            {showGB!==undefined && showGB && <GroupBand />}
        </div>
    );
}