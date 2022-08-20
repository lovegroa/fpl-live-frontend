import styled from 'styled-components';

export const LeagueTable = styled.div`
	overflow: auto;
	height: 50%;
	width: 100%;

	.captain {
		td {
			background-color: yellow;
			color: black;
		}
	}

	.vice-captain {
		background-color: orange;

		td {
			background-color: orange;
			color: black;
		}
	}
	.sub {
		background-color: red;

		td {
			background-color: red;
			color: white;
		}
	}
`;
