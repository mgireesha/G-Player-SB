import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObj } from "./redux/library/LibraryActions";
import { ALBUM, COMMON_POPUP_ERROR_MSG, INPUT, POPUP_PRIMARY_BTN, TEXT, TRACK } from "./redux/GPActionTypes";
import { PLAYLIST_ADD_TO_PLAYLIST_SUCCESS, PLAYLIST_CREATE_PLAYLIST_SUCCESS } from "./redux/playlist/PlaylistActionTypes";
import { addToPlaylist, setAddedNewPlaylistObj } from "./redux/playlist/PlaylistActions";

export const CommonPopup = () => {
    const dispatch = useDispatch();
    const commonPopupObj = useSelector(state => state.library.commonPopupObj);
    const contextObj = useSelector(state => state.library.contextObj);
    const addedNewPlaylistObj = useSelector(state => state.playlist.addedNewPlaylistObj);
    const plPhase = useSelector(state => state.playlist.phase);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(()=>{
        if(commonPopupObj){
            if(commonPopupObj.showPopup){
                setShowPopup(commonPopupObj.showPopup);
            }else{
                setShowPopup(false);
            }
            const errMsg = document.getElementById(COMMON_POPUP_ERROR_MSG);
            if(errMsg){
                errMsg.innerHTML = "";
            }
        }
    },[commonPopupObj]);

    const closePopup = () => {
        const tempPopupObj = {
            showPopup: false
        }
        dispatch(setCommonPopupObj(tempPopupObj));
    }

    useEffect(()=>{
        if(plPhase === PLAYLIST_CREATE_PLAYLIST_SUCCESS){
            closePopup();
        }
        if(plPhase === PLAYLIST_CREATE_PLAYLIST_SUCCESS && addedNewPlaylistObj.isAddToNewPlaylist){
            const reqPLObj = {
                playlist: addedNewPlaylistObj.playlistName.value,
                playlistId: addedNewPlaylistObj.playlistName.messageId
            }
            if(contextObj.type === ALBUM){
                reqPLObj["albumId"] = contextObj.obj.albumId;
                reqPLObj["albumName"] = contextObj.obj.album;
            }else if(contextObj.type === TRACK){
                reqPLObj["songId"] = contextObj.obj.songId;
                reqPLObj["albumName"] = contextObj.obj.album;
            }
            dispatch(addToPlaylist(reqPLObj));
        }
        if(plPhase === PLAYLIST_ADD_TO_PLAYLIST_SUCCESS){
            dispatch(setCommonPopupObj({showPopup:false}));
            dispatch(setAddedNewPlaylistObj({}));
        }
    },[plPhase]);

    useEffect(()=>{
            const handleKeyUp = (event) => {
                if(event.key === 'Enter'){
                    const primaryBtn = document.getElementById(POPUP_PRIMARY_BTN);
                    if(primaryBtn)primaryBtn.click();
                }
            }
            document.addEventListener('keyup', handleKeyUp, true);
            return () => {
                document.removeEventListener('keyup', handleKeyUp);
            };
    },[]);

    return (
        <>
            <div className="common-popup" style={{ display: showPopup ? 'flex' : 'none' }}>
                <div className="popup-container">
                    <div className="popup-header">
                        <label className='label'>{commonPopupObj.title}</label>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closePopup}>×</button>
                    </div>
                    <div className="popup-body">
                        {commonPopupObj.contentType === TEXT && 
                            commonPopupObj.content
                        }
                        {commonPopupObj.contentType === INPUT &&
                            <input type="text" defaultValue={commonPopupObj.content} id={commonPopupObj.elementId ? commonPopupObj.elementId:'COMMON_POPUP_INP_ID_1'} placeholder={commonPopupObj.placeHolder?commonPopupObj.placeHolder:''} />
                        }
                        <p id={COMMON_POPUP_ERROR_MSG} style={{color:'red',paddingTop:10}}></p>
                    </div>
                    <div className="popup-footer">
                        <div className='buttons'>
                            <button type="button" className="popup-btn-secondary" onClick={closePopup}>Cancel</button>
                            <button type="button" className={`popup-btn-primary ${commonPopupObj.className}`} 
                                onClick={commonPopupObj.primaryBtnFun}
                                id={POPUP_PRIMARY_BTN}
                                >
                                    {commonPopupObj.primaryBtnLabel?commonPopupObj.primaryBtnLabel:"Go"}
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className='disable-div' style={{ display: showPopup ? 'block' : 'none' }} onClick={closePopup}></div>
        </>
    );
}