import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from 'store/index';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <GoogleOAuthProvider clientId="168422788818-78dbsq38j1upflihl0p2iu3hueipsmv6.apps.googleusercontent.com">
//    {/* <React.StrictMode> */}
//     <Provider store={store}>
//       <App />
//     </Provider>
    
//    {/* </React.StrictMode> */}
//   </GoogleOAuthProvider>
// );

ReactDOM.render(
  <React.StrictMode>
   <GoogleOAuthProvider clientId="168422788818-78dbsq38j1upflihl0p2iu3hueipsmv6.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
   </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
