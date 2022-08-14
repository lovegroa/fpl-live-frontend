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
						.map((change) => {
							const { id, name, metric, old } = change;
							return (
								<tr>
									<td>{new Date(change.date).toLocaleTimeString()}</td>
									{/* <td>{id}</td> */}
									<td>{name}</td>
									<td>{metric}</td>
									<td>{old}</td>
									<td>{change.new}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</ChangeTableContainer>
	);
};

export default ChangeTable;
