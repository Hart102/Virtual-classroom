import changeTracker from "./ChangeTracker";
import MenuActionTracker from "./MenuActionTracker";
import { combineReducers } from "redux";


// COMBINE REUDCERS 
export const reducers = combineReducers({
    changeTracker,
    MenuActionTracker,
})