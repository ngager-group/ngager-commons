# ngager-commons

> Ngager common components

[![NPM](https://img.shields.io/npm/v/ngager-commons.svg)](https://www.npmjs.com/package/ngager-commons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngager-commons
```

## Usage

```jsx
import React, { Component } from 'react'
import { NgagerSearchField, CircularProgress, NgagerSelectField } from 'ngager-commons'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      status: null,
    }
    this.statusOptions = [
      {
        id: 'started',
        name: 'Started',
      },
      {
        id: 'notstarted',
        name: 'Not started',
      },
      {
        id: 'finished',
        name: 'Finished',
      },
    ];
    this.handleOnFilterTextChange = this.handleOnFilterTextChange.bind(this);
    this.handleOnStatusChange = this.handleOnStatusChange.bind(this);
  }

  handleOnFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleOnStatusChange(status) {
    console.log(status);
    this.setState({ status });
  }

  render () {
    const { status, filterText } = this.state;
    return (
      <div className="container">
        <fieldset>
          <legend>NgagerSearchField</legend>
            <NgagerSearchField
              onChange={this.handleOnFilterTextChange}
              wait={500}
            />
          <span>Filter text: <b>{filterText}</b> </span>
       </fieldset>
       <fieldset>
         <legend>CircularProgress</legend>
         <div style={{ textAlign: 'center' }}>
           <CircularProgress />
         </div>
      </fieldset>
      <fieldset>
        <legend>NgagerSelectField</legend>
        <NgagerSelectField
          autoWidth
          name="status"
          items={this.statusOptions}
          enableSelectAll
          selectAllLabel="All"
          placeholder="Status"
          onChange={this.handleOnStatusChange}
        />
        <span style={{ marginTop: 10, marginLeft: 1 }}>Status: <b>{status ? status.name : ''}</b> </span>
     </fieldset>
      </div>
    )
  }
}
```
## Example
https://ngager-group.github.io/ngager-commons/

## Components
#### NgagerSearchField
```jsx
NgagerSearchField.propTypes = {
  height: PropTypes.number,
  style: PropTypes.instanceOf(Object),
  initialValue: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  clearFilterText: PropTypes.string,
  disabled: PropTypes.bool,
  underlineShow: PropTypes.bool,
  clearTextShow: PropTypes.bool,
  wait: PropTypes.number,
};

NgagerSearchField.defaultProps = {
  height: 48,
  style: {},
  initialValue: '',
  color: '#36425A',
  placeholder: 'Filter...',
  clearFilterText: 'Clear',
  disabled: false,
  underlineShow: true,
  clearTextShow: true,
  wait: 0,
};
```

#### CircularProgress
```jsx
CircularProgress.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  thickness: PropTypes.number,
  style: PropTypes.instanceOf(Object),
  mainColor: PropTypes.string,
};

CircularProgress.defaultProps = {
  className: '',
  color: null,
  size: 'regular',
  thickness: 3,
  style: null,
  mainColor: '#36425A',
};
```

#### NgagerSelectField
```jsx
NgagerSelectField.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  autoWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  enableSelectAll: PropTypes.bool,
  selectAllValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectAllLabel: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.instanceOf(Array)]),
  placeholder: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func,
  keyField: PropTypes.string,
  nameField: PropTypes.string,
  wait: PropTypes.number,
};

NgagerSelectField.defaultProps = {
  style: {},
  name: null,
  multiple: false,
  autoWidth: false,
  fullWidth: true,
  disabled: false,
  isLoading: false,
  enableSelectAll: false,
  selectAllValue: null,
  selectAllLabel: '',
  defaultValue: null,
  placeholder: null,
  color: '#36425A',
  onChange: () => null,
  keyField: 'id',
  nameField: 'name',
  wait: 0,
};
```

#### NgagerErrorMessage
```jsx
NgagerErrorMessage.propTypes = {
  mainColor: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  i18n: PropTypes.instanceOf(Object),
  errors: PropTypes.instanceOf(Array),
  message: PropTypes.string,
  renderButton: PropTypes.func,
};

NgagerErrorMessage.defaultProps = {
  mainColor: '#36425A',
  style: {},
  i18n: null,
  errors: [],
  message: null,
  renderButton: null,
};
```

#### NgagerTreeView
```jsx
const data = {
  name: 'Parent',
  children: [
    {
      id: 1,
      name: 'Child 1',
    },
    ....


  NgagerTreeView.propTypes = {
    thickness: PropTypes.number,
    idField: PropTypes.string,
    childrenField: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.instanceOf(Object).isRequired,
    renderItem: PropTypes.func.isRequired,
  }

  NgagerTreeView.defaultProps = {
    thickness: 2,
    idField: 'id',
    childrenField: 'children',
    color: '#36425A',
  }
```

## License

MIT © [ngager-group](https://github.com/ngager-group)
