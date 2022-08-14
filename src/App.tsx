import { Route, Routes } from 'react-router-dom';
import { MainContainer } from './app.styles';
import Homepage from './routes/homepage/homepage.route';
import League from './routes/league/league.route';

function App() {
	return (
		<MainContainer>
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='/:leagueID' element={<League />}></Route>
			</Routes>
		</MainContainer>
	);
}

export default App;
