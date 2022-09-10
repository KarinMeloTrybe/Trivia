import { combineReducers } from 'redux';
import player from './Player';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  player,
  TokenReducer,
});

export default rootReducer;
