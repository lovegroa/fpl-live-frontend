import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeTable from '../../components/changes/changes.component';
import Navbar from '../../components/navbar/navbar.component';
import { fetchFPLDataAsync } from '../../store/fpl-data/fpl-data.actions';
import { selectFPLDataIsLoading, selectManagers, selectPlayers } from '../../store/fpl-data/fpl-data.selectors';
import { Container } from '../homepage/homepage.styles';
import { LeagueTable } from './league.styles';

export const League = () => {
	const { leagueID } = useParams();
	const dispatch = useDispatch();
	const leagueData = useSelector(selectManagers);
	const playerData = useSelector(selectPlayers);
	const isLoading = useSelector(selectFPLDataIsLoading);

	const [open, setOpen] = useState<boolean[]>([]);

	useEffect(() => {
		if (!isLoading) {
			setOpen(
				leagueData.managers.reduce<boolean[]>((acc, _manager) => {
					acc.push(false);
					return acc;
				}, [])
			);
		}
	}, [isLoading, leagueData.managers]);

	console.log(open);

	const openHandler = (index: number) => {
		open[index] = !open[index];
		console.log({ open });
		setOpen([...open]);
	};

	const findPlayer = (id: number) => {
		const player = playerData.filter((player) => player.id === id);

		if (player.length === 1) return player[0];

		return undefined;
	};

	useEffect(() => {
		if (leagueID) {
			dispatch(fetchFPLDataAsync(leagueID) as any);
		}
	}, [leagueID, dispatch]);

	return (
		<>
			{isLoading ? (
				'Loading'
			) : (
				<>
					<Navbar>{leagueData.name} </Navbar>
					<Container>
						<LeagueTable>
							<table>
								<thead>
									<tr>
										<th>Manager</th>
										<th>Total Points</th>
										<th>Gameweek Points</th>
									</tr>
								</thead>
								<tbody>
									{leagueData.managers.map((manager, index) => (
										<>
											<tr
												className={index % 2 === 0 ? 'even' : 'odd'}
												onClick={() => {
													openHandler(index);
												}}
											>
												<td>{manager.managerName}</td>
												<td>{manager.totalPoints}</td>
												<td>{manager.totalPoints}</td>
											</tr>

											{manager.picks.map((pick, index2) => {
												const player = findPlayer(pick.element);
												const mod = index % 2 === 0 ? 'even' : 'odd';
												const first = index2 === 0 ? 'first' : '';
												const last = index2 === manager.picks.length - 1 ? 'last' : '';

												return player ? (
													<tr
														className={
															open[index] ? `small ${mod} ${first} ${last}` : `hide small ${mod} ${first} ${last}`
														}
														id={`row-${index}`}
													>
														<td className='small'>{player.web_name}</td>
														<td className='small'>{player.total_points}</td>
														<td className='small'>{player.event_points}</td>
													</tr>
												) : (
													<></>
												);
											})}
										</>
									))}
								</tbody>
							</table>
						</LeagueTable>
						<ChangeTable />
					</Container>
				</>
			)}
		</>
	);
};

export default League;
