import styled from 'styled-components';

export const TableContainer = styled.table`
	width: 100%;
	border-spacing: 0;

	.closed {
		display: none;
	}

	img {
		transition: 0.5s;
	}

	.expand-open {
		transform: rotateZ(0deg);
	}
	.expand-closed {
		transform: rotateZ(90deg);
	}

	thead th {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	thead {
		background-color: #2c2c2c;
		width: 100%;
		color: white;
		border: none;

		th {
			position: sticky;
			padding: 10px;
			border: none;
			text-align: center;
			background-color: #2c2c2c;
		}
	}

	tbody {
		width: 100%;
		transition: 0.5s;
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
			background-color: #2c2c2c;
			color: white;
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
			padding: 5px;
		}

		td {
			font-size: 80%;
			text-align: center;
			background-color: inherit;
		}
	}

	tr {
	}

	td {
		/* width: 100%; */
		height: 100%;
	}

	.hover:hover {
		background-color: #2c2c2c;
		color: white;
		cursor: pointer;
	}

	.hide {
		display: none;
	}
`;
