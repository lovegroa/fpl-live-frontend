import { AnyAction } from 'redux';
import { fetchFPLDataFailed, fetchFPLDataStart, fetchFPLDataSuccess } from './fpl-data.actions';
import { BootstrapStatic, LeagueType } from './fpl-data.types';

export type FPLDataState = {
	readonly league: LeagueType;
	readonly bootstrapStatic: BootstrapStatic;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const FPL_DATA_INITIAL_STATE: FPLDataState = {
	league: {
		new_entries: {
			has_next: false,
			page: -1,
			results: [],
		},
		last_updated_data: new Date('1/1/2022'),
		league: {
			id: -1,
			name: '',
			created: new Date('1/1/2022'),
			closed: false,
			max_entries: undefined,
			league_type: '',
			scoring: '',
			admin_entry: -1,
			start_event: -1,
			code_privacy: '',
			has_cup: false,
			cup_league: undefined,
			rank: undefined,
		},
		standings: {
			has_next: false,
			page: -1,
			results: [],
		},
	},
	bootstrapStatic: {
		events: [],
		game_settings: {
			league_join_private_max: -1,
			league_join_public_max: -1,
			league_max_size_public_classic: -1,
			league_max_size_public_h2h: -1,
			league_max_size_private_h2h: -1,
			league_max_ko_rounds_private_h2h: -1,
			league_prefix_public: '',
			league_points_h2h_win: -1,
			league_points_h2h_lose: -1,
			league_points_h2h_draw: -1,
			league_ko_first_instead_of_random: false,
			cup_start_event_id: undefined,
			cup_stop_event_id: undefined,
			cup_qualifying_method: undefined,
			cup_type: undefined,
			squad_squadplay: -1,
			squad_squadsize: -1,
			squad_team_limit: -1,
			squad_total_spend: -1,
			ui_currency_multiplier: -1,
			ui_use_special_shirts: false,
			ui_special_shirt_exclusions: [],
			stats_form_days: -1,
			sys_vice_captain_enabled: false,
			transfers_cap: -1,
			transfers_sell_on_fee: -1,
			league_h2h_tiebreak_stats: [],
			timezone: '',
		},
		phases: [],
		teams: [],
		total_players: -1,
		elements: [],
		element_stats: [],
		element_types: [],
	},
	isLoading: true,
	error: null,
};

export const fplDataReducer = (state = FPL_DATA_INITIAL_STATE, action = {} as AnyAction): FPLDataState => {
	if (fetchFPLDataStart.match(action)) {
		return { ...state, isLoading: true };
	}

	if (fetchFPLDataSuccess.match(action)) {
		return { ...state, isLoading: false, league: action.payload.league, bootstrapStatic: action.payload.bootstrapStatic };
	}
	if (fetchFPLDataFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}

	return state;
};
