import React, { useState } from "react";
import { COMING_SOON_LABEL, EXPORT_LABEL, IMPORT_LABEL, IMPORT_PLAYLISTS_LABEL } from "../redux/GPActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { exportPlaylists, importPlaylists } from "../redux/playlist/PlaylistActions";
import { setCommonPopupObj } from "../redux/library/LibraryActions";
import { Spinner } from '../utilities/Spinner';

export const ImportExportPlaylistPopupBtns = () => {
    const dispatch = useDispatch();

    const commonPopupObj = useSelector(state => state.library.commonPopupObj);

    const [showImportOptions, setShowImportOptions] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});

    const onExportPlaylists = () => {
        if(window.confirm("Export Playlists ?")===true){
            dispatch(exportPlaylists());
        }
    }

    const onSetShowImportOptions = (showImportOptions) => {
        setShowImportOptions(showImportOptions);
        const tempCommonPopupObj = {...commonPopupObj};
        tempCommonPopupObj.primaryClassName = "g-btn success";
        tempCommonPopupObj.primaryBtnLabel = IMPORT_LABEL;
        tempCommonPopupObj.primaryBtnFun = submitImportPlaylists
        dispatch(setCommonPopupObj(tempCommonPopupObj));
    }

    const handleFileOnChange = async (event) => {
        const tempSelectedFiles = {};
        let fileType;
        let fileList;
        if(event.target){
            fileType = event.target.accept;
            fileList = event.target.files;
        }else{
            fileType = event.accept;
            fileList = event.files;
        }
        
        const fileListLength = fileList.length;
        let file;
        let fileReader;
        let playlistName;
        for(let i=0; i<fileListLength;i++){
            file = fileList[i];
            playlistName = file.name;
            playlistName = playlistName.substring(0, playlistName.length-fileType.length);
            fileReader = new FileReader();
            fileReader.readAsText(file);
            const result = await new Promise((resolve, reject) => {
                fileReader.onload = function(event) {
                resolve(fileReader.result)
                }
            })
            tempSelectedFiles[playlistName] = result.split("\r\n");
        }
        setSelectedFiles(tempSelectedFiles); 
        /*console.log("tempSelectedFiles",tempSelectedFiles);
        const tempCommonPopupObj = {...commonPopupObj};
        tempCommonPopupObj.payload = tempSelectedFiles;
        tempCommonPopupObj.dispatchPayload = true;
        dispatch(setCommonPopupObj(tempCommonPopupObj));*/
        return tempSelectedFiles;
    }

    const submitImportPlaylists = async () => {
        //console.log("selectedFiles",{...selectedFiles});
        const fileInput = document.getElementById("CSV_IMPORT_INPUT");
        if(fileInput){
            if(fileInput.files.length === 0){
                alert("No file selected");
                return false;
            }
            const selectedFiles = await handleFileOnChange(fileInput);
            console.log("v 73",selectedFiles);
            if(window.confirm("Import Playlists ?")===true){
                setShowSpinner(true);
                dispatch(importPlaylists(selectedFiles));
            }
        }
        
    }

    return(
        <div className="import-export-playlist-popup-btns">
            {!showImportOptions && 
            <>
                <div className="export-playlist">
                    <button className="g-btn md success" onClick={onExportPlaylists}>
                        <spna>{EXPORT_LABEL}</spna>
                    </button>
                </div>
                <div className="import-playlist">
                    <button className="g-btn md success" onClick={()=>onSetShowImportOptions(true)}>
                        <spna>{IMPORT_LABEL}</spna>
                    </button>
                </div>
            </>
            }
            {showImportOptions &&
                <>
                    {!showSpinner && 
                        <div className="import-options">
                            <div className="import-csv">
                                <input type="file" className="csv" accept=".csv" multiple /*onChange={(event)=>handleFileOnChange(event)}*/ id="CSV_IMPORT_INPUT" />
                            </div>
                            <div className="import-m3u">
                                <input type="file" className="m3u" accept=".m3u" multiple disabled title={COMING_SOON_LABEL} />
                            </div>
                        </div>
                    }
                    {showSpinner && <div className="flex-align-center-100"><Spinner spinnerInp={{classSize:'sm', text:"Importing"}} /></div>}
                </>
            }
        </div>
    );
}