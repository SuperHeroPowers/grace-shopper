import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {

  const {handleClick, isLoggedIn} = props;

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">SuperHero++</Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className='active'><Link to="/">Home</Link></li>
            <li><Link to="#">Physical</Link></li>
            <li><Link to="#">Mental</Link></li>
            <li><Link to="#">Manipulation</Link></li>
            <li><Link to="#">Transportation</Link></li>
          </ul>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search"></input>
            </div>
          <button type="submit" className="btn btn-default">Submit</button>
          </form>
          {
          isLoggedIn ?
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/home">My Account</Link></li>
            <li><Link to="/logout" onClick={handleClick}>Log out</Link></li>
            <li><Link to="#">Cart</Link></li>
          </ul>
          :
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="#">Cart</Link></li>
          </ul>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
