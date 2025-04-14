import './Navbar.css'
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

export default function Navbar() {
    return (
    <>  
        <nav className='nav-above'>
            <Link to='/dashboard'>
                Home
            </Link>   
            <Link to='#'>
                    Profile
            </Link>
        </nav>
        <nav className='nav-left'>
            <ul>
                <CustomLink to='/your-applications'>
                    Your applications
                </CustomLink>
                <CustomLink to='#'>
                    Job Listing
                </CustomLink>
                <CustomLink to='#'>
                    Analytics
                </CustomLink>
            </ul>
        </nav>
    </>
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