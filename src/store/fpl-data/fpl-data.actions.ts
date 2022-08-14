import axios from 'axios';
import { Action, ActionWithPayload, withMatcher, createAction } from '../../utils/reducer.utils';
import { BootstrapStatic, FPLDataType, FPL_DATA_ACTION_TYPES, LeagueType } from './fpl-data.types';

export type FetchFPLDataStart = Action<FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_START>;
export type FetchFPLDataSuccess = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_SUCCESS, FPLDataType>;
export type FetchFPLDataFailed = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_FAILED, Error>;

export const fetchFPLDataStart = withMatcher((): FetchFPLDataStart => createAction(FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_START));
export const fetchFPLDataSuccess = withMatcher(
	(fplData: FPLDataType): FetchFPLDataSuccess => createAction(FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_SUCCESS, fplData)
);
export const fetchFPLDataFailed = withMatcher((error: Error): FetchFPLDataFailed => createAction(FPL_DATA_ACTION_TYPES.FETCH_FPL_DATA_FAILED, error));

export const fetchFPLDataAsync = (leagueID: string) => async (dispatch: any) => {
	dispatch(fetchFPLDataStart());
	try {
		Promise.all([axios.get(`/leagueID/${leagueID}`), axios.get(`/bootstrap-static/`)]).then(([league, bootstrapStatic]) => {
			dispatch(fetchFPLDataSuccess({ league: league.data, bootstrapStatic: bootstrapStatic.data }));
		});
	} catch (error: any) {
		dispatch(fetchFPLDataFailed(error));
	}
};
