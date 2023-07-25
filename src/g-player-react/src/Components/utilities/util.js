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
        access.scrollIntoView(true);
        //access.scrollIntoView({behavior: 'smooth'}, true);
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

export const getCookieDetails = () => {
    const cookies = document.cookie;
    const cookieArr = cookies.split(";");
    const cookieDetails = {};
    let cookieArr1;
    cookieArr.forEach((cookie => {
        if(cookie!==""){
            cookieArr1 = cookie.split("=");
            cookieDetails[cookieArr1[0].trim()] = cookieArr1[1].trim();
        }
    }))
    return cookieDetails;
}

export const setCookies = (name, value) => {
    const date = new Date();
    const expires = new Date(date);
    expires.setDate(expires.getDate()+5);
    document.cookie=name+"="+value+"; expires="+expires+"; path=/";
}

export const getCookieValue = (name) => {
    const cookies = document.cookie;
    const cookieArr = cookies.split(";");
    let cookieArr1;
    let cookieValue;
    cookieArr.forEach((cookie => {
        if(cookie!==""){
            cookieArr1 = cookie.split("=");
            if(cookieArr1[0].trim() ===name){
                cookieValue = cookieArr1[1].trim();
            }
        }
    }))
    return cookieValue;
}

export const sortGroupByField = (entArr, field) => {
    let entListObj = {};
    let tempArr = [];
    let ind;
    entArr.forEach((ent) => {
        if (ent[field] !== null && ent[field] !== undefined && ent[field] !== "") {
            if(field==='title' || field==='albumName' || field==='artistName'){
                ind = ent[field].substring(0, 1).toUpperCase();
                if (!isNaN(ind)) {
                    ind = '#';
                }
            }else if(field === 'lyricsAvl'){
                ind = ent.lyricsAvl ? 'Tracks with lyrics' : 'No Lyrics'
            }else{
                ind = ent[field];
            }
            if (entListObj[ind] !== undefined) {
                tempArr = entListObj[ind];
                tempArr.push(ent);
                entListObj[ind] = tempArr;
            } else {
                entListObj[ind] = [ent];
            }
        }
    });
    console.log(entListObj)
return entListObj;
}

export const showHideSideBar = () => {
    if(!isMobile()){
        return;
    }
    const sideBar = document.getElementById('sidebar');
    if(sideBar.offsetWidth > 0){
        sideBar.classList.remove('show-mobile-sidebar');
        document.getElementById('MenuSideBarFold').style.display = 'none';
    }else{
        sideBar.classList.add('show-mobile-sidebar');
        document.getElementById('MenuSideBarFold').style.display = 'block';
    }
}

export const isMobile = () => {
    return ( ( window.innerWidth <= 760 ) 
    //&& ( window.innerHeight <= 600 ) 
    );
  }

export const checkIfActionAllowed = (emeIds, event) => {
    const itrCount = 12;
    let elem = event.target;
    let tempIsclickedOnCM = false;
    if(elem !== undefined && elem !== null){
        for(let i = 0; i< itrCount;i++){
            if(elem && ((elem.id && emeIds.includes(elem.id)) || (elem.data_id && emeIds.includes(elem.data_id)))){
                tempIsclickedOnCM = true;
                break;
            }else if(elem){
                elem = elem.parentElement;
            }
        }
    }
    return tempIsclickedOnCM;
}

export const callWikiAPI = async(wikiURL) => {
    const response = await fetch(wikiURL);
    const data = await response.json();
    return data;
}