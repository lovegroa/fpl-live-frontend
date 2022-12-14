import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChangeTable from '../../components/changes/changes.component';
import LoaderEllipsis from '../../components/loader-ellipsis/loader-ellipsis.component';
import Navbar from '../../components/navbar/navbar.component';
import Table from '../../components/table/table.component';
import { fetchLeagueAsync } from '../../store/fpl-data/fpl-data.actions';
import { selectFPLDataIsLoading, selectLatestChanges, selectManagers, selectPlayers } from '../../store/fpl-data/fpl-data.selectors';
import { Container } from '../homepage/homepage.styles';
import Share from '../../assets/share.svg';
import Expand from '../../assets/expand.svg';
import { Textfit } from 'react-textfit';
import { LeagueTable } from './league.styles';
import { Pick } from '../../store/fpl-data/fpl-data.selectors';

export const League = () => {
	const { leagueID } = useParams();
	const dispatch = useDispatch();
	const latestChanges = useSelector(selectLatestChanges);
	const leagueData = useSelector(selectManagers);
	const playerData = useSelector(selectPlayers);
	const isLoading = useSelector(selectFPLDataIsLoading);
	const [shared, setShared] = useState(false);
	const [sharedName, setsharedName] = useState('');

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

	const openHandler = (index: number) => {
		open[index] = !open[index];
		setOpen([...open]);
	};

	const findPlayer = (id: number) => {
		const player = playerData.filter((player) => player.id === id);

		if (player.length === 1) return player[0];

		return undefined;
	};

	useEffect(() => {
		if (leagueID) {
			dispatch(fetchLeagueAsync(leagueID) as any);
		}
	}, [leagueID, dispatch]);

	const shareHandler = (manager: typeof leagueData.managers[0]) => {
		navigator.clipboard.writeText(`${window.location.hostname}${process.env.REACT_APP_LOCAL_PORT}/entry/${manager.entry}`);
		setShared(true);
		setsharedName(manager.managerName);
		setTimeout(() => {
			setShared(false);
		}, 5 * 1000);
	};

	const findPickGameweekPoints = (pick: Pick): number => {
		const playerChanges = latestChanges.filter((change) => change.id === pick.element && change.metric === 'total_points');

		if (!playerChanges.length) return 0;
		const playerChange = playerChanges[0];

		if (pick.is_captain) return playerChange.new * 2;

		return playerChange.new;
	};

	return (
		<>
			{isLoading ? (
				<>
					<Navbar>
						<LoaderEllipsis />
					</Navbar>
					<Container></Container>
				</>
			) : (
				<>
					<Navbar>
						<Textfit mode='multi' style={{ height: 'calc(100% - 20px)', width: 'calc(100% - 20px)' }}>
							{leagueData.name}
						</Textfit>{' '}
					</Navbar>
					<Container>
						<LeagueTable>
							<Table>
								<thead>
									<tr>
										<th>Share</th>
										<th>Manager</th>
										<th>GW Points</th>
										<th>Points</th>
										<th></th>
									</tr>
								</thead>
								{leagueData.managers.map((manager, index) => {
									const gameweekPoints = manager.picks.reduce((acc, pick, index) => {
										if (index > 10) return acc;
										return (acc += findPickGameweekPoints(pick));
									}, 0);

									return (
										<Fragment key={index}>
											<tbody>
												<tr className={index % 2 === 0 ? 'even' : 'odd'}>
													<td
														onClick={() => {
															shareHandler(manager);
														}}
													>
														<div
															style={{
																display: 'flex',
																justifyContent: 'center',
																justifyItems: 'center',
																// width: '100%',
																// height: '100%',
															}}
														>
															{<img src={Share} alt='share' style={{}} />}
														</div>
													</td>
													<td
														onClick={() => {
															openHandler(index);
														}}
													>
														{manager.managerName}
													</td>
													<td
														onClick={() => {
															openHandler(index);
														}}
													>
														{gameweekPoints}
														{manager.eventTransfersCost ? ` (${-manager.eventTransfersCost})` : ''}
													</td>
													<td
														onClick={() => {
															openHandler(index);
														}}
													>
														{manager.totalPoints - manager.eventPoints + gameweekPoints}
													</td>
													<td
														onClick={() => {
															openHandler(index);
														}}
													>
														<div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
															<img
																className={open[index] ? 'expand-open' : 'expand-closed'}
																src={Expand}
																alt='expand'
																style={{ height: '20px' }}
															/>
														</div>
													</td>
												</tr>
											</tbody>

											<tbody className={open[index] ? 'open' : 'closed'}>
												{manager.picks.map((pick, index2) => {
													const player = findPlayer(pick.element);
													const mod = index % 2 === 0 ? 'even' : 'odd';
													const first = index2 === 0 ? 'first' : '';
													const last = index2 === manager.picks.length - 1 ? 'last' : '';
													const captain = manager.picks[index2].is_captain ? 'captain' : '';
													const viceCaptain = manager.picks[index2].is_vice_captain ? 'vice-captain' : '';
													const sub = index2 > 10 && 'sub';
													const classes = `small ${mod} ${first} ${last} ${captain} ${viceCaptain} ${sub}`;

													return player ? (
														<tr
															key={index2}
															className={open[index] ? `open ${classes}` : `closed ${classes}`}
															id={`row-${index}`}
														>
															<td>
																<div></div>
															</td>
															<td>
																<div> {player.web_name}</div>
															</td>
															<td>
																<div> {findPickGameweekPoints(pick)}</div>
															</td>
															<td>
																<div> {player.total_points}</div>
															</td>
															<td>
																<div>
																	{captain && 'C'}
																	{viceCaptain && 'VC'}
																	{sub && 'S'}
																</div>
															</td>
														</tr>
													) : (
														<></>
													);
												})}
											</tbody>
										</Fragment>
									);
								})}
							</Table>
						</LeagueTable>
						<ChangeTable />
					</Container>
				</>
			)}

			<div
				style={{
					position: 'absolute',
					bottom: '0',
					width: '100%',
					backgroundColor: 'rgba(100, 100, 100, 0.9)',
					borderRadius: '100px 100px 0  0 ',
					textAlign: 'center',
					padding: '10px 50px',
					color: 'white',
					fontSize: '20px',
					fontWeight: 'bold',
					transition: '0.5s',
					opacity: `${shared ? '1' : '0'}`,
					height: `${shared ? '100px' : '0'}`,
				}}
			>
				{sharedName}'s personal link, copied to clipboard!
			</div>
		</>
	);
};

export default League;
