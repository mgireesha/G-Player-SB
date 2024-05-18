import React, { useEffect, useState } from "react";
import { ARTIST_IMG_DOWNLOAD_STATUS, BUILD_STATUS, COMPLETED, COMPONENT, CURRENT_PAGE, GP_LIBRARY_DESCRIPTION, GP_LIBRARY_DESC_TEXT_1, INIT, INITIATED, LIBRARY, LIBRARY_BUILD, LIBRARY_LABEL, MUSIC_PATH, RUNNING } from "../redux/GPActionTypes";
import { initLibraryBuild, setCommonPopupObj } from "../redux/library/LibraryActions";
import { useDispatch, useSelector } from "react-redux";
import { setCookies } from "../utilities/util";
import loading_icon from '../images/Loading.gif';
import { Spinner } from "../utilities/Spinner";


export const BuildLibraryPopup = () => {
    const dispatch = useDispatch();

    const buildStatusList = useSelector(state => state.library.buildStatus);
    const [isBuildRunning, setIsBuildRunning] = useState(false);
    const [isBuildCompleted, setIsBuildCompleted] = useState(false);
    const [isBuildInit, setIsBuildInit] = useState(false);

    console.log("isBuildRunning:", isBuildRunning)

    useEffect(()=>{
        if(buildStatusList.length > 0){
            const buildStatus = [...buildStatusList].find(bs=>bs.name===BUILD_STATUS);
            if(buildStatus){
                setIsBuildRunning(buildStatus.value === RUNNING ? true : false);
            setIsBuildCompleted(buildStatus.value === COMPLETED ? true : false);
            setIsBuildInit(buildStatus.value === INIT ? true : false);
            }
        }
        console.log("buildStatusList: ",buildStatusList)
    },[buildStatusList])

    useEffect(()=>{
        if(isBuildCompleted)dispatch(setCommonPopupObj({
            showPopup: false
        }));
    },[isBuildCompleted])
    return (
        <>
            {!isBuildRunning &&
                <div className="flexbox-align-center" style={{columnGap:10}}>
                    <span>Take backup of playlists before build ?</span>
                    <input type="checkbox" id="build_playlist_backup_chkbox" className="custom-checkbox" style={{border:'1px solid', borderRadius:3}} />
                </div>
            }
            {(isBuildRunning) && <div className="flex-align-center-100"><Spinner spinnerInp={{classSize:'sm', text:"Builing"}} /></div>}
        </>
    );
}