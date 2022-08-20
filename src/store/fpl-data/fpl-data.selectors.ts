import { createSelector } from 'reselect';
import { RootState } from '../store';
import { FPLDataState } from './fpl-data.reducer';

const selectFPLDataReducer = (state: RootState): FPLDataState => state.fplData;

export const selectLeague = createSelector([selectFPLDataReducer], (fplDataSlice) => fplDataSlice.league);
export const selectEntry = createSelector([selectFPLDataReducer], (fplDataSlice) => fplDataSlice.entry);
export const selectPlayers = createSelector([selectFPLDataReducer], (fplDataSlice) => fplDataSlice.bootstrapStatic.elements);
export const selectFPLDataIsLoading = createSelector([selectFPLDataReducer], (fplDataSlice) => fplDataSlice.isLoading);

type Pick = {
	element: number;
	position: number;
	multiplier: number;
	is_captain: boolean;
	is_vice_captain: boolean;
};

type Manager = {
	entry: number;
	managerName: string;
	teamName: string;
	totalPoints: number;
	picks: Pick[];
};

type League = {
	name: string;
	id: number;
	managers: Manager[];
};

export const selectManagers = createSelector([selectLeague], (fplDataSlice) => {
	const league: League = {
		name: fplDataSlice.league.name,
		id: fplDataSlice.league.id,
		managers: fplDataSlice.standings.results.reduce<Manager[]>((acc, team) => {
			acc.push({
				entry: team.entry,
				managerName: team.player_name,
				teamName: team.entry_name,
				totalPoints: team.total,
				picks: team.team.picks.reduce<Pick[]>((acc, pick) => {
					acc.push(pick);
					return acc;
				}, []),
			});

			return acc;
		}, []),
	};

	return league;
});

export const selectGameweek = createSelector([selectFPLDataReducer], (fplDataSlice) => {
	const { bootstrapStatic } = fplDataSlice;

	return bootstrapStatic.events.reduce((acc, event) => {
		if (event.is_current) {
			acc = event.id;
		}
		return acc;
	}, 0);
});
