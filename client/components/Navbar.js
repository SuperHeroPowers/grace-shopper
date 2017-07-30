import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
    constructor(){
        super();
        this.state={categories:[]};
    }

    componentDidMount(){
        axios.get('/api/categories')
            .then(res => res.data)
            .then(categories => this.setState({ categories }));
    }

    render(props){
        const {handleClick, isLoggedIn} = this.props;
        const categories=this.state.categories;

        return (
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">SuperHero++</Link>
                </div>
                <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                    <li className='active'><Link to="/">Home</Link></li>
                      <li><Link to="/products">All Products</Link></li>

                      {
                          categories.map(category => {
                              return (
                                  // category.name
                                  <li key={category.id}>
                                    <Link to={`/categories/${category.name}`}>{ category.name }</Link>
                                  </li>
                              );
                          })
                      }

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
                              <li><Link to="#">My Account</Link></li>
                              <li><Link to="#" onClick={handleClick}>Log out</Link></li>
                              <li><Link to="#">Cart</Link></li>
                            </ul>
                            :
                            <ul className="nav navbar-nav navbar-right">
                              <li><Link to="/signup">Sign up</Link></li>
                              <li><Link to="/login">Log in</Link></li>
                              <li><Link to="/cart">Cart</Link></li>
                            </ul>
                    }
                </div>
              </div>
            </nav>
        );

    }
}