import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { Link } from 'react-router-dom';
import LoaderEllipsis from '../../components/loader-ellipsis/loader-ellipsis.component';
import Navbar from '../../components/navbar/navbar.component';
import Table from '../../components/table/table.component';
import { fetchEntryAsync } from '../../store/fpl-data/fpl-data.actions';
import { selectEntry, selectFPLDataIsLoading } from '../../store/fpl-data/fpl-data.selectors';
import { Container } from '../homepage/homepage.styles';

export const Entry = () => {
	const { entryID } = useParams();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectFPLDataIsLoading);
	const entry = useSelector(selectEntry);
	const navigate = useNavigate();

	useEffect(() => {
		if (entryID) {
			dispatch(fetchEntryAsync(entryID) as any);
		}
	}, [entryID, dispatch]);
	//4420091
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
						<Textfit style={{ height: '100%' }} mode='multi'>
							{entry.player_first_name} <span className='no-wrap'>{entry.player_last_name}</span>
						</Textfit>
					</Navbar>
					<Container>
						<Table>
							<thead>
								<tr>
									<th>My Leagues</th>
								</tr>
							</thead>
							<tbody>
								{entry.leagues.classic
									.filter((league) => !league.short_name)
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((league, index) => (
										<tr
											onClick={() => {
												navigate(`/league/${league.id}`);
											}}
											className={index % 2 === 0 ? 'odd hover' : 'even hover'}
											key={index}
										>
											<td>{league.name}</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Container>
				</>
			)}
		</>
	);
};

export default Entry;
