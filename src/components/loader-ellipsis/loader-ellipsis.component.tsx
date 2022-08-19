import { FC } from 'react';
import { LoaderEllipsisContainer } from './loader-ellipsis.styles';

const LoaderEllipsis: FC = () => {
	return (
		<LoaderEllipsisContainer>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</LoaderEllipsisContainer>
	);
};

export default LoaderEllipsis;
