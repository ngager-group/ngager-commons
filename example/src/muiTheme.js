import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as ngagerThemeValues from './ngagerThemeValues';

export const fontFamily = 'Helvetica Neue, Helvetica, Open Sans, verdana';

export const muiTheme = getMuiTheme({
  // fontFamily: 'Play, Open Sans, verdana',
  fontFamily,
  palette: {
    primary1Color: ngagerThemeValues.NGAGER_COLOR_BRANDLIGHT,
    textColor: ngagerThemeValues.NGAGER_COLOR_BLACK,
    canvasColor: '#fff',
    borderColor: ngagerThemeValues.NGAGER_COLOR_UNDERLINE,
    disabledColor: ngagerThemeValues.NGAGER_COLOR_BLACK,
    shadowColor: 'rgba(0,0,0,0)',
  },
  button: {
    height: ngagerThemeValues.NGAGER_BUTTON_HEIGHT,
  },
  raisedButton: {
    textColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    fontSize: 14,
  },
  dropDownMenu: {
    accentColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
  },
  menuItem: {
    selectedTextColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
  },
  table: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  tableHeaderColumn: {
    textColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
    spacing: 4,
  },
  tableRow: {
    hoverColor: ngagerThemeValues.NGAGER_COLOR_TABLEROWSEPARATOR,
    height: 60,
    borderColor: ngagerThemeValues.NGAGER_COLOR_TABLEROWSEPARATOR,
  },
  tabs: {
    backgroundColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    textColor: ngagerThemeValues.NGAGER_COLOR_BLACK,
    selectedTextColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
  },
  datePicker: {
    color: ngagerThemeValues.NGAGER_COLOR_BRAND,
    textColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    calendarTextColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
    selectColor: ngagerThemeValues.NGAGER_COLOR_CTA,
    selectTextColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    headerColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
  },
  snackbar: {
    textColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    backgroundColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
    actionColor: 'red',
  },
  avatar: {
    color: ngagerThemeValues.NGAGER_COLOR_BRAND,
    backgroundColor: ngagerThemeValues.NGAGER_COLOR_FADED,
  },
  textField: {
    floatingLabelColor: '#5a74a9',
  },
  timePicker: {
    color: 'red',
    textColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
    accentColor: ngagerThemeValues.NGAGER_COLOR_CTA,
    headerColor: ngagerThemeValues.NGAGER_COLOR_BRAND,
    selectTextColor: ngagerThemeValues.NGAGER_COLOR_WHITE,
  },
});
