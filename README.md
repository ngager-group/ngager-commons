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

## License

MIT © [ngager-group](https://github.com/ngager-group)
