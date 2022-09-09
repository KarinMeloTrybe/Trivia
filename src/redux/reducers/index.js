import { combineReducers } from 'redux';
// import player from './Login';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  // player,
  TokenReducer,
});

export default rootReducer;
