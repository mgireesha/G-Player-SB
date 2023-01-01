import React, { useEffect } from "react";
import {RxDoubleArrowRight} from 'react-icons/rx';
import {RiDeleteBinLine} from 'react-icons/ri';
import { deleteMusicPath, fetchMusicPath, initLibraryBuild, saveMusicPath } from "./redux/library/LibraryActions";
import { useDispatch, useSelector } from "react-redux";
import { MUSIC_PATH } from "./redux/GPActionTypes";
import { LIBRARY_SAVE_MUSIC_PATH_SUCCESS } from "./redux/library/LibraryActionTypes";

export const Library = () => {
    const dispatch = useDispatch();
    const musicPaths = useSelector(state => state.library.musicPaths);
    const libraryPhase = useSelector(state => state.library.phase);
    const onInitLibraryBuild = () => {
        if(window.confirm("Build library ?")===true){
            dispatch(initLibraryBuild());
        }
    }

    const onSaveMusicPath = () => {
        const mPath =  document.getElementById('music_path').value;
        if(mPath==="")return;
        const musicPath = {
            name : MUSIC_PATH,
            type: MUSIC_PATH,
            value: mPath
        }
        try {
            dispatch(saveMusicPath(musicPath));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        dispatch(fetchMusicPath());
    },[])

    useEffect(()=>{
        if(libraryPhase===LIBRARY_SAVE_MUSIC_PATH_SUCCESS){
            document.getElementById('music_path').value = "";
        }
    },[libraryPhase])

    return(
        <div className="library">
            <div className="header">
                <h1 style={{fontWeight:500}}>Library</h1>
            </div>
            <div className="body">
                <div className="library-build">
                    <h4>Build Library</h4>
                    <div className="content">
                        <p>Library is list of all songs available in the local machine. 
                            Generate library every time there is a change in any songs
                            (Selected folders in Library List).
                        </p>
                        <p>This might take from few seconds to few mins.</p>
                    </div>
                    <div className="btn-container">
                        <a className="library-btn" onClick={onInitLibraryBuild}>Build Library</a>
                    </div>
                </div>
                <div className="library-list">
                    <h4>Library List</h4>
                    <div className="content">
                        <p>
                            Paste all the music folders' full path.
                        </p>
                        <div className="input-container">
                            <input id="music_path" />
                            <a className="library-btn" onClick={onSaveMusicPath}>Add</a>
                        </div>
                    </div>
                    <div className="existing-lib-paths">
                        {musicPaths.map((musicPath, index)=>
                            <label key={index}>{musicPath.value}<RiDeleteBinLine onClick={()=>dispatch(deleteMusicPath(musicPath))} /></label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}