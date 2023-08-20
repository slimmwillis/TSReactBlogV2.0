import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App'; // Change this to your main component
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:5500"

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement); // Create a root instance

root.render(
 
  
    
      <App />
);