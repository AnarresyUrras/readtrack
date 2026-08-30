import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="main-nav">
            <NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                Dashboard
            </NavLink>
            <NavLink to="/library" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                Library
            </NavLink>
        </nav>
    );
}

export default Nav;