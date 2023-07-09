import React, { useEffect, useState } from "react";

import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { setStatusMessage } from "../redux/library/LibraryActions";

export const StatusMessage = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state.library.statusMessage);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(()=> {
        if(message && message !== ""){
            setShowMessage(true);
        }
    },[message]);

    useEffect(()=>{
        if(showMessage){
            setTimeout(() => {
                closeMessage();
            }, 5000);
        }
    },[showMessage]);

    const closeMessage = () => {
        setShowMessage(false);
        dispatch(setStatusMessage(""));
    }

    return(
        <div className="status-message" style={{display:showMessage?'flex':'none'}}>
            <span>{message}</span>
            <span className="close" onClick={closeMessage}><IoClose /></span>
        </div>
    );
}