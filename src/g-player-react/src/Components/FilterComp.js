import React from "react";
import {IoMdClose} from 'react-icons/io';
export const FilterComp = ({onSetFilterTxt}) =>{
    const onClose = () => {
        const filterInpFld = document.getElementById('filter-input-field');
        filterInpFld.value = "";
        filterInpFld.focus();
        filterInpFld.blur();
    }
    return(
        <div className='filter-component'>
            <input type="text" onChange={(event)=>onSetFilterTxt(event)} onBlur={(event)=>onSetFilterTxt(event)}
                placeholder="Filter" className="filter-input-field" id='filter-input-field'
                title="Supports Title, Album, Year and Genre"
            />
            <IoMdClose className="filter-close-icon" onClick={onClose} />
        </div>
    );
}