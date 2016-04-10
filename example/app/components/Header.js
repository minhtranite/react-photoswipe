import React from 'react';
import {Link} from 'react-router';

import logo from 'assets/images/logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="layout-header">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <Link className="navbar-brand" to="/">
                <img width="20" src={logo}/>
              </Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;

