import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsClickedOnCM, setShowContextMenu, setShowPlaylistSelector } from "../redux/library/LibraryActions";
import { GP_CONTEXT_MENU_ELEM_IDS } from "../redux/GPActionTypes";

export const ContexMenu = () => {
    const dispatch = useDispatch();
    const contextObj = useSelector(state => state.library.contextObj);
    const showContextMenu = useSelector(state => state.library.showContextMenu);
    const [styles, setStyles] = useState({display:'none'});
    useEffect(()=>{
        if(contextObj && contextObj.position){
            console.log("contextObj",contextObj)
            const position = contextObj.position;
            const tempStyles = {
                position: 'absolute',
                left: parseInt(position.x)-6,
                top: parseInt(position.y)+30,
                width: parseInt(position.width),
                backgroundColor:'#AB3C3C',
                padding:5,
                borderRadius:2,
                zIndex:1000
            }
            setStyles(tempStyles);
            // setTimeout(() => {
            //     dispatch(setIsClickedOnCM(true));
            // }, 100);
        }
        
    },[contextObj]);

    // const contextMenuElem = document.getElementById("context_menu");
    // if(contextMenuElem){
    //     contextMenuElem.addEventListener("click", function (event) {
    //         console.log("event tarteg: ", event.target);
    //     })
    // }

    

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
            //dispatch(setIsClickedOnCM(tempIsclickedOnCM));
            // if(showContextMenu && !tempIsclickedOnCM){
            //     dispatch(setShowContextMenu(false));
            // }
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
    
    return(
        <div id="context_menu" className="context-menu" style={styles}>
            <div className="row" onClick={()=>onSetShowPlaylistSelector(true)}>
                <label>Add to playlist</label>
            </div>
        </div>
    );
}