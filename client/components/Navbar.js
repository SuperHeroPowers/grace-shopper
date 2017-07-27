import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/products" className="navbar-brand">Super Hero PowerUp!</Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">All</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="#">My Account</Link></li>
            <li><Link to="#">Cart</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
