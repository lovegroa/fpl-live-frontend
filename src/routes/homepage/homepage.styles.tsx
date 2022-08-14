import styled from 'styled-components';

export const Container = styled.div`
	height: 89%;
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	max-width: 1000px;
`;

export const Card = styled.div`
	background-color: white;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-size: 28px;
	text-align: center;
	padding: 20px;
	flex-direction: column;
	margin-bottom: 20px;

	.no-wrap {
		white-space: nowrap;
	}
`;

export const CleanForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	input {
		border-radius: 10px;
		font-size: 28px;
		text-align: center;
		margin-bottom: 20px;
		border: none;
		box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
		width: 80%;
	}

	button {
		border: none;
		height: fit-content;
		padding: 0 20px;
		border-radius: 20px;
		background-color: #2c2c2c;
		color: white;
		font-size: 30px;
		width: fit-content;
	}
`;
