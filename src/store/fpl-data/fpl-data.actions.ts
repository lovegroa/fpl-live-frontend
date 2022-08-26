import axios from 'axios';
import { Action, ActionWithPayload, withMatcher, createAction } from '../../utils/reducer.utils';
import { BootstrapStatic, EntryType, FPL_DATA_ACTION_TYPES, LatestChange, LeagueType, SavedEntry } from './fpl-data.types';

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
export type FetchLatestChangesSuccess = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_LATEST_CHANGES_SUCCESS, LatestChange[]>;
export type FetchLatestChangesFailed = ActionWithPayload<FPL_DATA_ACTION_TYPES.FETCH_LATEST_CHANGES_FAILED, Error>;

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
export const fetchLatestChangesSuccess = withMatcher(
	(latestChanges: LatestChange[]): FetchLatestChangesSuccess => createAction(FPL_DATA_ACTION_TYPES.FETCH_LATEST_CHANGES_SUCCESS, latestChanges)
);
export const fetchLatestChangesFailed = withMatcher(
	(error: Error): FetchLatestChangesFailed => createAction(FPL_DATA_ACTION_TYPES.FETCH_LATEST_CHANGES_FAILED, error)
);

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
		const { data }: { data: EntryType } = await axios.get(`${BACKEND_API}/entry/${entryID}/`);
		dispatch(fetchEntrySuccess(data));
		let entries = window.localStorage.getItem(`entries`);

		if (entries) {
			console.log(entries);
			const parsedEntries: SavedEntry[] = JSON.parse(entries).filter((entry: SavedEntry) => {
				console.log(entry.id, data.id);
				return entry.id !== data.id;
			});
			console.log(parsedEntries);
			const newEntries = [{ firstName: data.player_first_name, lastName: data.player_last_name, id: data.id }].concat(parsedEntries);
			console.log(newEntries);
			window.localStorage.setItem('entries', JSON.stringify(newEntries));
		} else {
			window.localStorage.setItem(
				'entries',
				JSON.stringify([{ firstName: data.player_first_name, lastName: data.player_last_name, id: data.id }])
			);
		}
	} catch (error: any) {
		dispatch(fetchEntryFailed(error));
	}
};
export const fetchLatestChangesAsync = () => async (dispatch: any) => {
	try {
		const { data } = await axios.get(`${BACKEND_API}/latest-changes/`);
		dispatch(fetchLatestChangesSuccess(data));
	} catch (error: any) {
		dispatch(fetchLatestChangesFailed(error));
	}
};
