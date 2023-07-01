import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowContextMenu, setShowPlaylistSelector } from "../redux/library/LibraryActions";
import { GP_CONTEXT_MENU, GP_CONTEXT_MENU_ELEM_IDS, MAIN_CONTAINER } from "../redux/GPActionTypes";
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from "react-router-dom";

export const GPContexMenu = () => {
    const dispatch = useDispatch();
    const contextObj = useSelector(state => state.library.contextObj);
    const showContextMenu = useSelector(state => state.library.showContextMenu);
    const [styles, setStyles] = useState({display:'none'});
    useEffect(()=>{
        if(contextObj && contextObj.position){
            const position = contextObj.position;
            const tempStyles = {
                left : parseInt(position.x)-6
            }
            console.log("contextObj",contextObj);
            const mainContainerHeight = document.getElementById(MAIN_CONTAINER).clientHeight;
            let gpCtxtMenuHeight = document.getElementById(GP_CONTEXT_MENU).clientHeight;
            if(gpCtxtMenuHeight === undefined || gpCtxtMenuHeight === 0)gpCtxtMenuHeight = 160;
            if((mainContainerHeight - position.top) > gpCtxtMenuHeight+ 40){
                tempStyles.top = parseInt(position.y)+25;
                
            }else{
                tempStyles.top = parseInt(position.y)-gpCtxtMenuHeight;
            }
            setStyles(tempStyles);
        }
        
    },[contextObj]);

    useEffect(() => {
        const handleClick = (event) => {
            const itrCount = 12;
            const emeIds = GP_CONTEXT_MENU_ELEM_IDS;
            let elem = event.target;
            let tempIsclickedOnCM = false;
            if(elem !== undefined && elem !== null){
                for(let i = 0; i< itrCount;i++){
                    if(elem && elem.id && emeIds.includes(elem.id)){
                        tempIsclickedOnCM = true;
                        break;
                    }else if(elem){
                        elem = elem.parentElement;
                    }
                }
            }
            dispatch(setShowContextMenu(tempIsclickedOnCM));
            if(!tempIsclickedOnCM){
                dispatch(setShowPlaylistSelector(false));
            }
        };
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(()=>{
        if(showContextMenu){
            const handleScroll = () => {
                dispatch(setShowContextMenu(false));
                dispatch(setShowPlaylistSelector(false));
            }
            document.addEventListener('scroll', handleScroll, true);
            return () => {
                document.removeEventListener('scroll', handleScroll);
            };
        }
    },[]);

    const onSetShowPlaylistSelector = (showPlaylistSelector) => {
         dispatch(setShowPlaylistSelector(showPlaylistSelector));
     }

     const closeCOntextMenu = () => {
        dispatch(setShowContextMenu(false));
        dispatch(setShowPlaylistSelector(false));
    }
    
    return(
        <div id={GP_CONTEXT_MENU} className="gp-context-menu" style={styles}>
            <div className="row" onClick={()=>onSetShowPlaylistSelector(true)}>
                <label>Add to playlist</label>
                <MdKeyboardArrowRight className="icon" />
            </div>
            <div className="row">
                <label><strike>Edit info</strike>&nbsp;<span style={{fontSize:10}}>Coming soon</span></label>
                <MdKeyboardArrowRight className="icon" />
            </div>
            <div className="row">
                <Link to={`/music/albums/${contextObj.obj.albumName}`} onClick={closeCOntextMenu}>
                    <label>Album</label>
                    <MdKeyboardArrowRight className="icon" />
                </Link>
            </div>
            <div className="row">
                <Link to={`/music/album_artists/${contextObj.obj.albumArtist}`} onClick={closeCOntextMenu}>
                    <label>Artist</label>
                    <MdKeyboardArrowRight className="icon" />
                </Link>
            </div>
        </div>
    );
}