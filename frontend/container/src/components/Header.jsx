import React from 'react';
import { Link } from 'react-router-dom';

import MiniCart from 'cart/MiniCart';
import Login from 'authentication/Login';

export default function Header() {
  return (
    <div className="p-5 text-text-base text-2xl font-bold bg-primary">
      <div className="flex">
        <div className="flex-grow flex">
          <Link to="/">Book Store</Link>
        </div>
        <div className="flex-end relative">
          <MiniCart />
          <Login />
        </div>
      </div>
    </div>
  );
}
