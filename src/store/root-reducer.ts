import { combineReducers } from 'redux';
import { fplDataReducer } from './fpl-data/fpl-data.reducer';

export const rootReducer = combineReducers({
	fplData: fplDataReducer,
});
