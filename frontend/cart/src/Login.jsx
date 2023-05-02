import React, { useState } from 'react';

import { login, useLoggedIn, logout } from './auth';

export default function Login() {
  const loggedIn = useLoggedIn();
  const [showLogin, setShowLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loggedIn) {
    return (
      <>
        <button onClick={logout} class="pt-1" title="log out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLineJoin="round"
            class="feather feather-log-out h-5 w-5"
            id="showlogout"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </>
    );
  }

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)} title="log in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          id="showlogin"
        >
          <path
            strokeLinecap="round"
            strokeLineJoin="round"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </span>
      {showLogin && (
        <div
          className="absolute p-5 border-2 border-white bg-primary rounded-xl"
          style={{
            width: 300,
            top: '2rem',
            left: -250,
          }}
        >
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full text-text-base-dark"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full mt-3 text-text-base-dark"
          />
          <div class="flex justify-between">
            <button
              className="bg-white text-black hover:bg-primary hover:text-white border-2 border-black py-2 px-5 rounded-md text-sm mt-5"
              onClick={() => login(email, password)}
              id="loginbtn"
              title="log in"
            >
              Login
            </button>
            <button
              className="bg-white text-black hover:bg-primary hover:text-white border-2 border-black py-2 px-5 rounded-md text-sm mt-5"
              onClick={() => (window.location.href = '/register')}
              id="registerbtn"
              title="register"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}
