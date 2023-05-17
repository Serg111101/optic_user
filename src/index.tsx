import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { store } from './store';
import { Provider } from "react-redux";
import { Route, BrowserRouter as Routes } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( 
<Provider store={store}>
  <Routes>

    
       <Header/>
    <App />
    <Footer/>
    

  </Routes>
</Provider>
  );
