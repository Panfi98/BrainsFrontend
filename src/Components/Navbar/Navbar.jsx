import './Navbar.css'
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from '../../Context/AuthContext.jsx';

export default function Navbar() {
    const { userData } = useAuth()
    return (
    <nav className='navbar'>
        <div className='links'>
            <Link to='/dashboard' className='logo'>
                Home
            </Link>
            <div className='sublinks'>
                <Link to='#'>
                    Jobs
                    <IoIosArrowDown className='icon'/>
                </Link>
                <Link to='/your-applications'>
                    Your applications
                    <IoIosArrowDown className='icon'/>
                </Link>
                <Link to='#'>
                    Analytics
                    <IoIosArrowDown className='icon'/>
                </Link>
            </div>
        </div>
        <Link to='/profile' className='profile-link'>
            {userData.username}
            <IoIosArrowDown className='icon'/>
        </Link>
    </nav>
    )
}

function CustomLink({to,children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end : true})
    
    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}