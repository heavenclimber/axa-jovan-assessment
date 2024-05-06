import { combineReducers } from "redux";
import counterReducer from "@configs/Reducer/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add more reducers here if needed
});

export default rootReducer;
