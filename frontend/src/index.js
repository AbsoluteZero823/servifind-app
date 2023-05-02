import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ChatProvider from './Context/ChatProvider';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


ReactDOM.render(
  <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options}>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);