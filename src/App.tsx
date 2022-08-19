import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './app.styles';
import Entry from './routes/entry/entry.route';
import Homepage from './routes/homepage/homepage.route';
import League from './routes/league/league.route';
import { fetchBootstrapStaticAsync } from './store/fpl-data/fpl-data.actions';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBootstrapStaticAsync() as any);
	}, [dispatch]);

	return (
		<MainContainer>
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='/entry/:entryID' element={<Entry />}></Route>
				<Route path='/league/:leagueID' element={<League />}></Route>
			</Routes>
		</MainContainer>
	);
}

export default App;
