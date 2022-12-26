export const getMins = (seconds) =>{
    
    if(seconds==='' || seconds===undefined || seconds===null || seconds===0){
        return '';
    }
    const mins = Math.floor(seconds/60);
    let secs = Math.floor(seconds - (mins*60));
    secs = secs < 10 ? "0"+secs : secs;
    return mins+":"+secs;

    //function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
}

export const getMins0 = (seconds) =>{
    
    if(seconds==='' || seconds===undefined || seconds===null || seconds===0){
        return '';
    }
    let  mins = Math.floor(seconds/60);
    mins = mins < 10 ? "0"+mins : mins;
    let secs = Math.floor(seconds - (mins*60));
    secs = secs < 10 ? "0"+secs : secs;
    return mins+":"+secs;
}

export function handleAPIError(error){
    console.log(error);
    if(error.response!==undefined){
        if(error.response.data.status==="TOKEN_EXPIRED"){
            document.cookie="jToken=;";
            window.location.reload();
        }
    }
}

export function scrolltoId(id){
    try {
        const access = document.getElementById(id);
        access.scrollIntoView({behavior: 'smooth'}, true);
        //var rect = access.getBoundingClientRect();
        //console.log(rect.top, rect.right, rect.bottom, rect.left);
        //ccess.scrollTo(0, rect.bottom);
    } catch (error) {
        
    }
}

export const scrollToPlaying = (isPlaying)=>{
    if(isPlaying){
        const trackPlaying = document.getElementsByClassName("text-highlighted-y");
        if(trackPlaying.length>0){
         scrolltoId(trackPlaying[0].id);   
        }
    }
}

export const debounce = (fn) => {
    let timer;
    return function (...args) {
      const context=this;    
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      },1000);
    };
  };

  export const fetchArtistDetailsfromWiki =async(artist) => {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${artist}`);
    const data = await response.json();
    if(data['extract']!==undefined && (data['extract'].toLowerCase().includes('singer')
        || data['extract'].toLowerCase().includes('actor')) && !data['extract'].toLowerCase().includes('may refer to')){
        // setArtistWiki(data);
        // if(data["thumbnail"]!==undefined){
        //     setArtistWikiImg(data.thumbnail.source);
        // }
        return data;
    }
}