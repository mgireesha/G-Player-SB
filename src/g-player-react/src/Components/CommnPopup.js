import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommonPopupObj } from "./redux/library/LibraryActions";
import { REMOVE_LABEL } from "./redux/GPActionTypes";
import { deltePlaylist } from "./redux/playlist/PlaylistActions";

export const CommonPopup = () => {
    const dispatch = useDispatch();
    const commonPopupObj = useSelector(state => state.library.commonPopupObj);
    const [showPopup, setShowPopup] = useState(false);

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

    return (
        <>
            <div className="common-popup" style={{ display: showPopup ? 'flex' : 'none' }}>
                <div className="popup-container">
                    <div className="popup-header">
                        <label className='label'>{commonPopupObj.title}</label>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closePopup}>×</button>
                    </div>
                    <div className="popup-body">
                        {commonPopupObj.content}
                    </div>
                    <div className="popup-footer">
                        <div className='buttons'>
                            <button type="button" className="popup-btn-secondary" onClick={closePopup}>Cancel</button>
                            {commonPopupObj.primaryBtnAction === "REMOVE" && <button type="button" className="popup-btn-primary remove" onClick={commonPopupObj.primaryBtnFun}>{REMOVE_LABEL}</button>}
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div className='disable-div' style={{ display: showPopup ? 'block' : 'none' }} onClick={closePopup}></div>
        </>
    );
}