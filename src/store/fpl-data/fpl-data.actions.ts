import axios from 'axios';
import { Action, ActionWithPayload, withMatcher, createAction } from '../../utils/reducer.utils';
import { BootstrapStatic, EntryType, FPL_DATA_ACTION_TYPES, LeagueType } from './fpl-data.types';

let BACKEND_API = process.env.REACT_APP_BACKEND_API;

if (BACKEND_API) {
	BACKEND_API = BACKEND_API.replace(/\/+$/, '');
} else {
	BACKEND_API = '';
}

//Types

export type FetchBootstrapStaticStart = Action<FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_START>;
export type FetchBootstrapStaticSuccess = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_SUCCESS, BootstrapStatic>;
export type FetchBootstrapStaticFailed = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_FAILED, Error>;
export type FetchLeagueStart = Action<FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_START>;
export type FetchLeagueSuccess = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_SUCCESS, LeagueType>;
export type FetchLeagueFailed = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_FAILED, Error>;
export type FetchEntryStart = Action<FPL_DATA_ACTION_TYPES.FETCH_ENTRY_START>;
export type FetchEntrySuccess = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_ENTRY_SUCCESS, EntryType>;
export type FetchEntryFailed = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_ENTRY_FAILED, Error>;

//Matchers

export const fetchBootstrapStaticStart = withMatcher(
	(): FetchBootstrapStaticStart => createAction(FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_START)
);
export const fetchBootstrapStaticSuccess = withMatcher(
	(bootstrapStatic: BootstrapStatic): FetchBootstrapStaticSuccess =>
		createAction(FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_SUCCESS, bootstrapStatic)
);
export const fetchBootstrapStaticFailed = withMatcher(
	(error: Error): FetchBootstrapStaticFailed => createAction(FPL_DATA_ACTION_TYPES.FETCH_BOOTSTRAP_STATIC_FAILED, error)
);
export const fetchLeagueStart = withMatcher((): FetchLeagueStart => createAction(FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_START));
export const fetchLeagueSuccess = withMatcher(
	(league: LeagueType): FetchLeagueSuccess => createAction(FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_SUCCESS, league)
);
export const fetchLeagueFailed = withMatcher((error: Error): FetchLeagueFailed => createAction(FPL_DATA_ACTION_TYPES.FETCH_LEAGUE_FAILED, error));
export const fetchEntryStart = withMatcher((): FetchEntryStart => createAction(FPL_DATA_ACTION_TYPES.FETCH_ENTRY_START));
export const fetchEntrySuccess = withMatcher((entry: EntryType): FetchEntrySuccess => createAction(FPL_DATA_ACTION_TYPES.FETCH_ENTRY_SUCCESS, entry));
export const fetchEntryFailed = withMatcher((error: Error): FetchEntryFailed => createAction(FPL_DATA_ACTION_TYPES.FETCH_ENTRY_FAILED, error));

//Actions

export const fetchBootstrapStaticAsync = () => async (dispatch: any) => {
	dispatch(fetchBootstrapStaticStart());
	try {
		const { data } = await axios.get(`${BACKEND_API}/bootstrap-static/`);
		dispatch(fetchBootstrapStaticSuccess(data));
	} catch (error: any) {
		dispatch(fetchBootstrapStaticFailed(error));
	}
};

export const fetchLeagueAsync = (leagueID: string) => async (dispatch: any) => {
	dispatch(fetchLeagueStart());
	try {
		const { data } = await axios.get(`${BACKEND_API}/league/${leagueID}/`);
		dispatch(fetchLeagueSuccess(data));
	} catch (error: any) {
		dispatch(fetchLeagueFailed(error));
	}
};

export const fetchEntryAsync = (entryID: string) => async (dispatch: any) => {
	dispatch(fetchEntryStart());
	try {
		const { data } = await axios.get(`${BACKEND_API}/entry/${entryID}/`);
		dispatch(fetchEntrySuccess(data));
	} catch (error: any) {
		dispatch(fetchEntryFailed(error));
	}
};
