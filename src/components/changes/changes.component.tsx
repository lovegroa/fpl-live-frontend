import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectManagers } from '../../store/fpl-data/fpl-data.selectors';
import { ChangeTableContainer } from './changes.styles';

type Change = {
	date: string;
	id: number;
	name: string;
	metric: string;
	old: number;
	new: number;
};

const ChangeTable: FC = () => {
	const [changes, setChanges] = useState<Change[]>([]);
	const { managers } = useSelector(selectManagers);

	let allPlayers = managers.reduce<number[]>((acc, manager) => {
		return acc.concat(manager.picks.map((pick) => pick.element));
	}, []);

	allPlayers = Array.from(new Set(allPlayers));

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get('https://fpllive.herokuapp.com/latest-changes/');
			setChanges([...data]);
		};
		getData();

		setInterval(() => {
			getData();
		}, 1000 * 60);
	}, []);

	let previousDate: string;

	return (
		<ChangeTableContainer>
			<table>
				<thead>
					<tr>
						<th>Time</th>
						{/* <th>ID</th> */}
						<th>Player</th>
						<th>Metric</th>
						<th>Old</th>
						<th>New</th>
					</tr>
				</thead>
				<tbody>
					{changes
						.filter((player) => allPlayers.some((id) => player.id === id))
						.map((change, index) => {
							const { name, metric, old } = change;
							const date = new Date(change.date);

							if (index === 0) {
								previousDate = date.toDateString();
							}

							if (date.toDateString() !== previousDate || index === 0) {
								console.log(index);
								previousDate = date.toDateString();

								return (
									<>
										<tr>
											<td colSpan={5}>{date.toDateString()}</td>
										</tr>
										<tr>
											<td>{date.toLocaleTimeString()}</td>
											{/* <td>{id}</td> */}
											<td>{name}</td>
											<td>{metric}</td>
											<td>{old}</td>
											<td>{change.new}</td>
										</tr>
									</>
								);
							} else {
								return (
									<tr>
										<td>{date.toLocaleTimeString()}</td>
										{/* <td>{id}</td> */}
										<td>{name}</td>
										<td>{metric}</td>
										<td>{old}</td>
										<td>{change.new}</td>
									</tr>
								);
							}
						})}
				</tbody>
			</table>
		</ChangeTableContainer>
	);
};

export default ChangeTable;
