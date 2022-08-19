import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, CleanForm } from './homepage.styles';
import Navbar from '../../components/navbar/navbar.component';
const Homepage = () => {
	const [entryID, setEntryID] = useState('');
	const navigate = useNavigate();

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
			</Container>
		</>
	);
};

export default Homepage;
