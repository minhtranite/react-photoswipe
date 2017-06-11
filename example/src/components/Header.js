import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.svg';

const Header = () => (
  <header className="page__header">
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
            <img width="20" src={logo} alt=""/>
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

export default Header;

