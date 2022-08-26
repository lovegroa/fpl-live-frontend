import styled from 'styled-components';

export const ChangeTableContainer = styled.ul`
	background-color: black;
	color: white;
	font-family: monospace;
	padding: 5px;
	width: 100%;
	flex: 1 1 50%;
	list-style-type: none; /* Remove bullets */
	margin: 0; /* Remove margins */
	overflow-y: scroll;

	.date {
		text-align: left;
		width: 100%;
		font-weight: bolder;
		font-size: larger;
		color: yellow;
	}

	.good {
		color: limegreen;
	}

	.bad {
		color: red;
	}

	.gameweek {
		font-weight: 900;
		font-size: xx-large;
		text-align: left;
		background-color: white;
		color: black;
		display: flex;
		justify-content: space-around;

		button {
			background: none;
			color: inherit;
			border: none;
			padding: 0 5px;
			margin: 5px;
			font: inherit;
			cursor: pointer;
			outline: inherit;
			font-size: medium;
			border: 1px solid black;
		}
	}

	.time {
		text-align: left;
		width: 100%;
		font-weight: bold;
		/* font-size: large; */
		color: orange;
	}

	.details {
		padding: 0px 40px;
		white-space: normal;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.hide {
		display: none;
	}

	.nowrap {
		/* white-space: nowrap; */
	}
`;
