import { FC, ReactNode } from 'react';
import { NavbarContainer } from './navbar.styles';

interface Props {
	children: ReactNode;
}

const Navbar: FC<Props> = ({ children }) => {
	return <NavbarContainer>{children}</NavbarContainer>;
};

export default Navbar;
