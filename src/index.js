// scroll bar
import 'simplebar/src/simplebar.css';
import { initializeApp } from 'firebase/app';
import { FirebaseAuthProvider } from '@react-firebase/auth';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebase-config';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';


initializeApp(firebaseConfig);

// ----------------------------------------------------------------------

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      console.log("SW registered: ", reg);
    }, (err) => {
      console.log("SW registration failed: ", err);
    });
  });
}

// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
