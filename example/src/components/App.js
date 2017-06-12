import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Gallery from 'pages/Gallery';

const App = () => (
  <Router>
    <div className="page">
      <Header/>
      <main className="page__wrapper">
        <div className=" container page__main">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/gallery" component={Gallery}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </main>
      <Footer/>
    </div>
  </Router>
);

export default App;
