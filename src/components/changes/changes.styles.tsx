import styled from 'styled-components';

export const ChangeTableContainer = styled.div`
	height: 50%;
	overflow-y: scroll;
	width: 100%;

	table {
		width: 100%;
		border-spacing: 0;
	}

	thead {
		background-color: #2c2c2c;
		width: 100%;
		color: white;
		border: none;

		th {
			padding: 10px;
			border: none;
			text-align: center;
		}
	}

	tbody {
		background-color: black;

		tr {
			background-color: black;
			height: 40px;
		}

		td {
			font-size: 80%;
			text-align: center;
			color: white;
		}
	}

	.hide {
		display: none;
	}
`;
