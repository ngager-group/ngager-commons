import React, { Component } from 'react'
import { NgagerSearchField, CircularProgress, NgagerSelectField, NgagerErrorMessage } from 'ngager-commons'

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
       <fieldset>
         <legend>NgagerErrorMessage</legend>
         <NgagerErrorMessage />
      </fieldset>
      </div>
    );
  }
}
