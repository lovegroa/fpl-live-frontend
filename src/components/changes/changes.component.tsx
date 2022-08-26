import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestChangesAsync } from '../../store/fpl-data/fpl-data.actions';
import { selectGameweek, selectLatestChanges, selectManagers } from '../../store/fpl-data/fpl-data.selectors';
import { ChangeTableContainer } from './changes.styles';

const ChangeTable: FC = () => {
	const latestChanges = useSelector(selectLatestChanges);
	const { managers } = useSelector(selectManagers);
	const gameweekNo = useSelector(selectGameweek);
	const [showDetails, setShowDetails] = useState(true);

	const dispatch = useDispatch();

	type ChangesByDate = {
		date: string;
		changesByTime: {
			time: string;
			changesByID: {
				id: number;
				name: string;
				oldPoints: number;
				newPoints: number;
				delta: number;
				changes: { change: string; oldValue: number; newValue: number; delta: number }[];
			}[];
		}[];
	}[];

	type Pick = {
		id: number;
		entryID: number;
		isCaptain: boolean;
	};

	const picks = managers.reduce<Pick[]>((acc, manager) => {
		const mPicks = manager.picks.map((pick) => {
			return { id: pick.element, entryID: manager.entry, isCaptain: pick.is_captain };
		});

		acc.push(...mPicks);

		return acc;
	}, []);

	const changesArray = latestChanges
		.filter((change) => change.metric !== 'total_points')
		.filter((change) => picks.some((pick) => pick.id === change.id))
		.reduce<ChangesByDate>((acc, change) => {
			const dateTime = new Date(change.date);
			const date = dateTime.toDateString();
			const time = dateTime.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			});

			//find or create date
			if (!acc.filter((item1) => item1.date === date).length) acc.push({ date, changesByTime: [] });

			const changesByDate = acc.filter((item1) => item1.date === date)[0].changesByTime;

			//find or create time

			if (!changesByDate.filter((item2) => item2.time === time).length) changesByDate.push({ time, changesByID: [] });

			const changesByTime = changesByDate.filter((item2) => item2.time === time)[0].changesByID;

			//find previous total points

			const tempPlayer = latestChanges.filter(({ id, date, metric }) => change.id === id && change.date === date && metric === 'total_points');
			let oldPoints = 0;
			let newPoints = 0;

			if (tempPlayer.length) {
				newPoints = tempPlayer[0].new;
				oldPoints = tempPlayer[0].old;
			}

			let delta = newPoints - oldPoints;

			//find or create player

			if (!changesByTime.filter((item3) => item3.id === change.id).length) {
				changesByTime.push({ id: change.id, name: change.name, oldPoints, newPoints, delta, changes: [] });
			}

			const changesByID = changesByTime.filter((item3) => item3.id === change.id)[0].changes;

			changesByID.push({ change: change.metric, oldValue: change.old, newValue: change.new, delta: change.new - change.old });

			return acc;
		}, []);

	useEffect(() => {
		dispatch(fetchLatestChangesAsync() as any);
		const updateMinutely = setInterval(() => {
			dispatch(fetchLatestChangesAsync() as any);
		}, 1000 * 60);

		const stop = () => {
			clearInterval(updateMinutely);
			console.log('interval stopped');
		};

		return () => {
			stop();
		};
	}, [dispatch]);

	return (
		<>
			<ChangeTableContainer>
				<li className='gameweek'>
					Gameweek {gameweekNo}{' '}
					<button
						onClick={() => {
							setShowDetails(!showDetails);
						}}
					>
						{showDetails ? 'Hide Details' : 'Show Details'}
					</button>
				</li>
				<br />
				{changesArray.map(({ date, changesByTime }, index1) => {
					return (
						<>
							<li className='date' key={index1}>
								{date}
							</li>
							{changesByTime.map(({ time, changesByID }, index2) => {
								return (
									<>
										<li className='time' key={index2}>
											{time}
										</li>
										{changesByID.map(({ id, changes, delta, name, newPoints, oldPoints }, index3) => (
											<>
												<li>
													<strong>
														{name}: {newPoints} {newPoints === 1 ? 'point' : 'points'}
														<span className={delta > 0 ? 'good' : 'bad'}> ({delta > 0 ? `+${delta}` : `${delta}`})</span>
													</strong>
												</li>
												<li className={`details ${showDetails ? '' : 'hide'}`}>
													<span>
														{((picks.filter((pick) => pick.id === id).length / managers.length) * 100).toFixed(0)}% owned{' '}
													</span>
													<span>
														{(
															(picks.filter((pick) => pick.id === id && pick.isCaptain).length / managers.length) *
															100
														).toFixed(0)}
														% captained
													</span>
												</li>
												<li className={`details ${showDetails ? '' : 'hide'}`}>
													{' '}
													{changes.map(({ change, delta }) => (
														<span className='nowrap'>
															{change} ({delta > 0 ? `+${delta}` : `${delta}`}){' '}
														</span>
													))}
												</li>
											</>
										))}
									</>
								);
							})}
						</>
					);
				})}
			</ChangeTableContainer>
		</>
	);
};

export default ChangeTable;
