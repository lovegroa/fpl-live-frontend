import styled from 'styled-components';

export const LeagueTable = styled.div`
	height: 300px;
	width: 100%;
	margin-bottom: 20px;

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
		.even {
			background-color: #f2f2f2;
		}

		.odd {
			background-color: white;
		}

		.small {
			font-size: 85%;
			height: 12px;
			padding: 0;
		}

		.first {
			td {
				border-top: 1px solid #2c2c2c;
				padding-top: 10px;
			}
		}

		.last {
			td {
				border-bottom: 1px solid #2c2c2c;
				padding-bottom: 10px;
			}
		}

		tr {
			height: 40px;
		}

		td {
			font-size: 80%;
			text-align: center;
			background-color: inherit;
		}
	}

	.hide {
		display: none;
	}
`;
