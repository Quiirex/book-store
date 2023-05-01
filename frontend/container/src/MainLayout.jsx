import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'remixicon/fonts/remixicon.css';
import './index.scss';

import Header from 'container/Header';
import Footer from 'container/Footer';
import PDPContent from 'pdp/PDPContent';
import HomeContent from 'container/HomeContent';
import CartContent from 'cart/CartContent';

export default function MainLayout() {
  return (
    <Router>
      <div className="text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">
          <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route path="/product/:id" component={PDPContent} />
            <Route path="/cart" component={CartContent} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
