import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { muiTheme } from './muiTheme';
import './index.css'
import App from './App'

const AppProvider = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  injectTapEventPlugin();
  ReactDOM.render(<AppProvider />, document.getElementById('root'));
});

export default AppProvider;
