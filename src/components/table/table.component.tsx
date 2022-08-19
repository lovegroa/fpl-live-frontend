import { FC, ReactNode } from 'react';
import { TableContainer } from './table.styles';

interface Props {
	children: ReactNode;
}

const Table: FC<Props> = ({ children }) => {
	return <TableContainer>{children}</TableContainer>;
};

export default Table;
