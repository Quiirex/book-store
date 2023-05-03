import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'remixicon/fonts/remixicon.css';
import '../index.scss';

import Header from 'container/Header';
import Footer from 'container/Footer';
import PDPContent from 'pdp/PDPContent';
import HomeContent from 'container/HomeContent';
import CartContent from 'cart/CartContent';
import Register from 'authentication/Register';

export default function MainLayout() {
  return (
    <Router>
      <div className="text-3xl mx-auto h-full w-full flex flex-col min-h-screen">
        <Header />
        <div className="my-5 flex-1">
          <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route path="/book/:id" component={PDPContent} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={CartContent} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
