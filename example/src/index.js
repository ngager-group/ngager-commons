import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { i18n } from 'ngager-commons';
import { muiTheme } from './muiTheme';
import './index.css'
import App from './App'

const AppProvider = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </MuiThemeProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<AppProvider />, document.getElementById('root'));
});

export default AppProvider;
