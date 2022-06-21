
import React from 'react' ;
import { NavLink } from 'react-router-dom' ;

const Header = () => {
    return (
        <div>
            <header className="header">
                <h1>Pet Shelter App</h1>
                <NavLink className="nav-link" to='/'> Home </NavLink>
                <NavLink className="nav-link" to='/new'> Add A Pet </NavLink>
            </header>
        </div>
    )
}

export default Header ;