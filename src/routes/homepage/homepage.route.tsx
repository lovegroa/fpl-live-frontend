import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, CleanForm } from './homepage.styles';
import Navbar from '../../components/navbar/navbar.component';
import { SavedEntry } from '../../store/fpl-data/fpl-data.types';
import Table from '../../components/table/table.component';
const Homepage = () => {
	const [entryID, setEntryID] = useState('');
	const navigate = useNavigate();
	const entries = window.localStorage.getItem(`entries`);
	const parsedEntries: SavedEntry[] = entries ? JSON.parse(entries) : [];

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		navigate(`/entry/${entryID}`);
	};

	const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setEntryID(event.target.value);
	};

	return (
		<>
			<Navbar>FPL Vidi</Navbar>
			<Container>
				<Card>
					Enter your entry <span className='no-wrap'>number below</span>{' '}
				</Card>
				<CleanForm onSubmit={handleSubmit}>
					<input onChange={inputHandler}></input>
					<button type='submit'>Continue</button>
				</CleanForm>
				<br />
				{entries?.length ? (
					<Table>
						<thead>
							<tr>
								<th>Recently Viewed</th>
							</tr>
						</thead>
						<tbody>
							{parsedEntries.map((entry, index) => (
								<tr
									onClick={() => {
										navigate(`/entry/${entry.id}`);
									}}
									className={index % 2 === 0 ? 'odd hover' : 'even hover'}
									key={index}
								>
									<td>
										{entry.firstName} {entry.lastName}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<></>
				)}
			</Container>
		</>
	);
};

export default Homepage;
