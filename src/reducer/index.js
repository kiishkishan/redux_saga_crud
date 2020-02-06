import users from "./users";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: users
});

export default rootReducer;
