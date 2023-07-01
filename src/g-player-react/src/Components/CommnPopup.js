import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObj } from "./redux/library/LibraryActions";
import { CREATE, CREATE_LABEL, INPUT, REMOVE, REMOVE_LABEL, RENAME, RENAME_LABEL, TEXT } from "./redux/GPActionTypes";
import { PLAYLIST_CREATE_PLAYLIST_SUCCESS } from "./redux/playlist/PlaylistActionTypes";

export const CommonPopup = () => {
    const dispatch = useDispatch();
    const commonPopupObj = useSelector(state => state.library.commonPopupObj);
    const plPhase = useSelector(state => state.playlist.phase);
    const [showPopup, setShowPopup] = useState(false);
    console.log(commonPopupObj)

    useEffect(()=>{
        if(commonPopupObj && commonPopupObj.showPopup){
            setShowPopup(commonPopupObj.showPopup);
        }else{
            setShowPopup(false);
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
    },[plPhase]);

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
                    </div>
                    <div className="popup-footer">
                        <div className='buttons'>
                            <button type="button" className="popup-btn-secondary" onClick={closePopup}>Cancel</button>
                            {commonPopupObj.primaryBtnAction === REMOVE && <button type="button" className="popup-btn-primary remove" onClick={commonPopupObj.primaryBtnFun}>{REMOVE_LABEL}</button>}
                            {commonPopupObj.primaryBtnAction === RENAME && <button type="button" className="popup-btn-primary rename" onClick={commonPopupObj.primaryBtnFun}>{RENAME_LABEL}</button>}
                            {commonPopupObj.primaryBtnAction === CREATE && <button type="button" className="popup-btn-primary create" onClick={commonPopupObj.primaryBtnFun}>{CREATE_LABEL}</button>}
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className='disable-div' style={{ display: showPopup ? 'block' : 'none' }} onClick={closePopup}></div>
        </>
    );
}