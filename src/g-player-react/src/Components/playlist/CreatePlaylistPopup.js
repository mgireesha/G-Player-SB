import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist, setShowCreatePlaylistPopup } from '../redux/playlist/PlaylistActions';
import { CREATE_PLAYLIST_LABEL } from '../redux/GPActionTypes';
import { PLAYLIST_CREATE_PLAYLIST_SUCCESS } from '../redux/playlist/PlaylistActionTypes';

export const CreatePlaylistPopup = ({ msize }) => {
	const dispatch = useDispatch();
	const showPopup = useSelector(state => state.playlist.showCreatePlaylistPopup);
	const plPhase = useSelector(state => state.playlist.phase);
	if (msize === undefined || msize === null) {
		msize = 'md';
	}
	const onCreatePlalist = () => {
		const playlistName = document.getElementById('playlist_name');
		if(!playlistName || playlistName.value === ""){
			if(playlistName)playlistName.style.border = '1px solid red';
			return;
		}
		playlistName.style.border = '1px solid lightgrey';
		const createPlaylistObj = {
			"name":"PLAYLIST",
			"value":playlistName.value,
			"type":"PLAYLIST"
			}
		dispatch(createPlaylist(createPlaylistObj));
	}

	useEffect(()=>{
		if(plPhase === PLAYLIST_CREATE_PLAYLIST_SUCCESS){
			const playlistName = document.getElementById('playlist_name');
			if(playlistName)playlistName.value = "";
			dispatch(setShowCreatePlaylistPopup(false));
		}
	},[plPhase])

	return (
		<>
			<div className="create-playlist-popup" style={{ display: showPopup ? 'flex' : 'none' }}>
				<div className="popup-container">
					<div className="popup-header">
						<label className='label'>{CREATE_PLAYLIST_LABEL}</label>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => dispatch(setShowCreatePlaylistPopup(false))}>×</button>
					</div>
					<div className="popup-body">
						<input type="text" id="playlist_name" className="plalist-name" placeholder='Playlist Name' autoFocus="true" defaultValue="" />
					</div>
					<div className="popup-footer">
						<div className='buttons'>
							<button type="button" className="popup-btn-secondary" onClick={() => dispatch(setShowCreatePlaylistPopup(false))}>Cancel</button>
							<button type="button" className="popup-btn-primary" onClick={onCreatePlalist}>Create</button>
						</div>
						<br/>
					</div>
				</div>
			</div>
			<div className='disable-div' style={{ display: showPopup ? 'block' : 'none' }} onClick={() => dispatch(setShowCreatePlaylistPopup(false))}></div>
		</>
	);
}