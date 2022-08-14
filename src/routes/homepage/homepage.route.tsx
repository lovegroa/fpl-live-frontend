import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, CleanForm } from './homepage.styles';
import Navbar from '../../components/navbar/navbar.component';
const Homepage = () => {
	const [leagueID, setLeagueID] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		navigate(`/${leagueID}`);
	};

	const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setLeagueID(event.target.value);
	};

	return (
		<>
			<Navbar>FPL Live</Navbar>
			<Container>
				<Card style={{ height: '200px' }}>
					Enter your league <span className='no-wrap'>number below</span>{' '}
				</Card>
				<CleanForm onSubmit={handleSubmit}>
					<input onChange={inputHandler}></input>
					<button type='submit'>Continue</button>
				</CleanForm>
			</Container>
		</>
	);
};

export default Homepage;
