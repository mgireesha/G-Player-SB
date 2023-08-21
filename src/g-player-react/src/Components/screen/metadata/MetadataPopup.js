import React from 'react';
import { EditTrackInfo } from './EditTrackInfo';
import { useSelector } from 'react-redux';
import { TRACK } from '../../redux/GPActionTypes';

export const MetadataPopup = () => {
    const objType = useSelector(state => state.library.metadataPopupObj.objType);
    return(
        <div className='metadata-popup'>
            {objType === TRACK && <EditTrackInfo/>}
        </div>
    );
}