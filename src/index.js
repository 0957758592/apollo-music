import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './components/utils/theme';




ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root')
);

