import { combineReducers } from "redux";
import libraryReducer from "./library/LibraryReducer";
import playerReducer from "./player/PlayerReducer";

export const GPReducer = combineReducers({
    library: libraryReducer,
    player: playerReducer
})