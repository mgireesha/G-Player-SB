import { PLAYLIST_NAME } from "../redux/GPActionTypes";

export const getCreatePlaylistObj = () => {
    const playlistName = document.getElementById(PLAYLIST_NAME);
    if(!playlistName || playlistName.value === ""){
        if(playlistName)playlistName.style.border = '1px solid red';
        return;
    }
    playlistName.style.border = '1px solid lightgrey';
    const playlist = {
        // "name":"PLAYLIST",
        // "value":playlistName.value,
        // "type":"PLAYLIST"
        "name":playlistName.value
        }
    return {playlist};
}