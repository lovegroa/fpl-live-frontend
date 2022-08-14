export enum FPL_DATA_ACTION_TYPES {
	FETCH_FPL_DATA_START = 'fplData/FETCH_FPL_DATA_START',
	FETCH_FPL_DATA_SUCCESS = 'fplData/FETCH_FPL_DATA_SUCCESS',
	FETCH_FPL_DATA_FAILED = 'fplData/FETCH_FPL_DATA_FAILED',
}

export interface LeagueType {
	new_entries: {
		has_next: boolean;
		page: number;
		results: any[];
	};
	last_updated_data: Date;
	league: {
		id: number;
		name: string;
		created: Date;
		closed: boolean;
		max_entries?: any;
		league_type: string;
		scoring: string;
		admin_entry: number;
		start_event: number;
		code_privacy: string;
		has_cup: boolean;
		cup_league?: any;
		rank?: any;
	};
	standings: {
		has_next: boolean;
		page: number;
		results: {
			id: number;
			event_total: number;
			player_name: string;
			rank: number;
			last_rank: number;
			rank_sort: number;
			total: number;
			entry: number;
			entry_name: string;
			team: {
				active_chip?: any;
				automatic_subs: {
					entry: number;
					element_in: number;
					element_out: number;
					event: number;
				}[];
				entry_history: {
					event: number;
					points: number;
					total_points: number;
					rank: number;
					rank_sort: number;
					overall_rank: number;
					bank: number;
					value: number;
					event_transfers: number;
					event_transfers_cost: number;
					points_on_bench: number;
				};
				picks: {
					element: number;
					position: number;
					multiplier: number;
					is_captain: boolean;
					is_vice_captain: boolean;
				}[];
			};
		}[];
	};
}

export interface BootstrapStatic {
	events: {
		id: number;
		name: string;
		deadline_time: Date;
		average_entry_score: number;
		finished: boolean;
		data_checked: boolean;
		highest_scoring_entry?: number;
		deadline_time_epoch: number;
		deadline_time_game_offset: number;
		highest_score?: number;
		is_previous: boolean;
		is_current: boolean;
		is_next: boolean;
		cup_leagues_created: boolean;
		h2h_ko_matches_created: boolean;
		chip_plays: {
			chip_name: string;
			num_played: number;
		}[];
		most_selected?: number;
		most_transferred_in?: number;
		top_element?: number;
		top_element_info: {
			id: number;
			points: number;
		};
		transfers_made: number;
		most_captained?: number;
		most_vice_captained?: number;
	}[];
	game_settings: {
		league_join_private_max: number;
		league_join_public_max: number;
		league_max_size_public_classic: number;
		league_max_size_public_h2h: number;
		league_max_size_private_h2h: number;
		league_max_ko_rounds_private_h2h: number;
		league_prefix_public: string;
		league_points_h2h_win: number;
		league_points_h2h_lose: number;
		league_points_h2h_draw: number;
		league_ko_first_instead_of_random: boolean;
		cup_start_event_id?: any;
		cup_stop_event_id?: any;
		cup_qualifying_method?: any;
		cup_type?: any;
		squad_squadplay: number;
		squad_squadsize: number;
		squad_team_limit: number;
		squad_total_spend: number;
		ui_currency_multiplier: number;
		ui_use_special_shirts: boolean;
		ui_special_shirt_exclusions: any[];
		stats_form_days: number;
		sys_vice_captain_enabled: boolean;
		transfers_cap: number;
		transfers_sell_on_fee: number;
		league_h2h_tiebreak_stats: string[];
		timezone: string;
	};
	phases: {
		id: number;
		name: string;
		start_event: number;
		stop_event: number;
	}[];
	teams: {
		code: number;
		draw: number;
		form?: any;
		id: number;
		loss: number;
		name: string;
		played: number;
		points: number;
		position: number;
		short_name: string;
		strength: number;
		team_division?: any;
		unavailable: boolean;
		win: number;
		strength_overall_home: number;
		strength_overall_away: number;
		strength_attack_home: number;
		strength_attack_away: number;
		strength_defence_home: number;
		strength_defence_away: number;
		pulse_id: number;
	}[];
	total_players: number;
	elements: {
		chance_of_playing_next_round?: number;
		chance_of_playing_this_round?: number;
		code: number;
		cost_change_event: number;
		cost_change_event_fall: number;
		cost_change_start: number;
		cost_change_start_fall: number;
		dreamteam_count: number;
		element_type: number;
		ep_next: string;
		ep_this: string;
		event_points: number;
		first_name: string;
		form: string;
		id: number;
		in_dreamteam: boolean;
		news: string;
		news_added?: Date;
		now_cost: number;
		photo: string;
		points_per_game: string;
		second_name: string;
		selected_by_percent: string;
		special: boolean;
		squad_number?: any;
		status: string;
		team: number;
		team_code: number;
		total_points: number;
		transfers_in: number;
		transfers_in_event: number;
		transfers_out: number;
		transfers_out_event: number;
		value_form: string;
		value_season: string;
		web_name: string;
		minutes: number;
		goals_scored: number;
		assists: number;
		clean_sheets: number;
		goals_conceded: number;
		own_goals: number;
		penalties_saved: number;
		penalties_missed: number;
		yellow_cards: number;
		red_cards: number;
		saves: number;
		bonus: number;
		bps: number;
		influence: string;
		creativity: string;
		threat: string;
		ict_index: string;
		influence_rank: number;
		influence_rank_type: number;
		creativity_rank: number;
		creativity_rank_type: number;
		threat_rank: number;
		threat_rank_type: number;
		ict_index_rank: number;
		ict_index_rank_type: number;
		corners_and_indirect_freekicks_order?: number;
		corners_and_indirect_freekicks_text: string;
		direct_freekicks_order?: number;
		direct_freekicks_text: string;
		penalties_order?: number;
		penalties_text: string;
	}[];
	element_stats: {
		label: string;
		name: string;
	}[];
	element_types: {
		id: number;
		plural_name: string;
		plural_name_short: string;
		singular_name: string;
		singular_name_short: string;
		squad_select: number;
		squad_min_play: number;
		squad_max_play: number;
		ui_shirt_specific: boolean;
		sub_positions_locked: number[];
		element_count: number;
	}[];
}

export type FPLDataType = {
	league: LeagueType;
	bootstrapStatic: BootstrapStatic;
};
