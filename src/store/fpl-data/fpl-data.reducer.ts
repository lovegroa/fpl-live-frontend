import { AnyAction } from 'redux';
import {
	fetchBootstrapStaticFailed,
	fetchBootstrapStaticStart,
	fetchBootstrapStaticSuccess,
	fetchLeagueFailed,
	fetchLeagueStart,
	fetchLeagueSuccess,
	fetchEntryFailed,
	fetchEntryStart,
	fetchEntrySuccess,
	fetchLatestChangesSuccess,
	fetchLatestChangesFailed,
} from './fpl-data.actions';
import { BootstrapStatic, LeagueType, EntryType, LatestChange } from './fpl-data.types';

export type FPLDataState = {
	readonly league: LeagueType;
	readonly entry: EntryType;
	readonly bootstrapStatic: BootstrapStatic;
	readonly latestChanges: LatestChange[];
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
	entry: {
		id: -1,
		joined_time: new Date(),
		started_event: -1,
		favourite_team: null,
		player_first_name: '',
		player_last_name: '',
		player_region_id: -1,
		player_region_name: '',
		player_region_iso_code_short: '',
		player_region_iso_code_long: '',
		summary_overall_points: -1,
		summary_overall_rank: -1,
		summary_event_points: -1,
		summary_event_rank: -1,
		current_event: -1,
		leagues: {
			classic: [],
			h2h: [],
			cup: {
				matches: [],
				status: {
					qualification_event: null,
					qualification_numbers: null,
					qualification_rank: null,
					qualification_state: null,
				},
				cup_league: null,
			},
			cup_matches: [],
		},
		name: '',
		name_change_blocked: false,
		kit: null,
		last_deadline_bank: -1,
		last_deadline_value: -1,
		last_deadline_total_transfers: -1,
	},
	latestChanges: [],
	isLoading: true,
	error: null,
};

export const fplDataReducer = (state = FPL_DATA_INITIAL_STATE, action = {} as AnyAction): FPLDataState => {
	if (fetchBootstrapStaticStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchBootstrapStaticSuccess.match(action)) {
		return { ...state, isLoading: false, bootstrapStatic: action.payload };
	}
	if (fetchBootstrapStaticFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	if (fetchLeagueStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchLeagueSuccess.match(action)) {
		return { ...state, isLoading: false, league: action.payload };
	}
	if (fetchLeagueFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	if (fetchEntryStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchEntrySuccess.match(action)) {
		return { ...state, isLoading: false, entry: action.payload };
	}
	if (fetchEntryFailed.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	if (fetchLatestChangesSuccess.match(action)) {
		return { ...state, latestChanges: action.payload };
	}
	if (fetchLatestChangesFailed.match(action)) {
		return { ...state, error: action.payload };
	}

	return state;
};
