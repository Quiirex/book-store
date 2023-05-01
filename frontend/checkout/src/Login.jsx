import React, { useState } from 'react';

import { login, useLoggedIn } from './cart';

export default function Login() {
  const loggedIn = useLoggedIn();
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState('Bine');
  const [password, setPassword] = useState('123');

  if (loggedIn) return null;

  return (
    <>
      <span onClick={() => setShowLogin(!showLogin)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          id="showlogin"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </span>
      {showLogin && (
        <div
          className="absolute p-5 border-2 border-blue-800 bg-primary rounded-xl "
          style={{
            width: 300,
            top: '2rem',
            left: -250,
          }}
        >
          <input
            type="text"
            placeholder="Uporabniško ime"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full text-text-base-dark"
          />
          <input
            type="geslo"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="border text-sm border-gray-400 p-2 rounded-md w-full mt-3 text-text-base-dark"
          />
          <button
            className="bg-green-900 border-2 py-2 px-5 rounded-md text-sm mt-5 text-text-base"
            onClick={() => login(username, password)}
            id="loginbtn"
          >
            Vpis
          </button>
        </div>
      )}
    </>
  );
}
