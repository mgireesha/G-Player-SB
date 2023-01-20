import React, { useEffect, useState } from "react";
import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';

export const SliderRC = ({value, onValChange, step}) => {
    const [sliderVal, setSLiderval] = useState(0);

    useEffect(()=>{
        setSLiderval(value);
    },[value])
    const sfsdfdf = (event) => {
        //nothing
    }
    return(
        <div style={{height:'100%',width:'100%',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <>
                <Slider onAfterChange={(event)=>onValChange(event)} value={sliderVal}
                    min={0}
                    max={100}
                    step={step}
                    handleStyle={{top:5,width:18,height:18,border:'2px solid #346ef1',backgroundColor:'#346ef1', opacity:1}}
                    trackStyle={{backgroundColor:'#346ef1', height:10}}
                    railStyle={{backgroundColor:'lightgrey', height:10}}
                    onChange={(val)=>setSLiderval(val)}
                    
                />
            </>
        </div>
    );
}