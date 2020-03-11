import React, { Component } from 'react'
import { NgagerSearchField, CircularProgress, NgagerSelectField, NgagerErrorMessage, NgagerTreeView } from 'ngager-commons'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
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
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleOnStatusChange(status) {
    console.log(status);
    this.setState({ status });
  }

  handleOnClick(e) {
    this.setState({ type: e.target.id });
  }

  renderComponent() {
    const { type, filterText, status } = this.state;
    if (type === 'NgagerSearchField') {
      return (
        <div className="section">
            <NgagerSearchField
              onChange={this.handleOnFilterTextChange}
              wait={500}
            />
          <span>Filter text: <b>{filterText}</b> </span>
       </div>
      )
    }

    if (type === 'CircularProgress') {
      return (
        <div className="section">
          <CircularProgress />
       </div>
      );
    }

    if (type === 'NgagerSelectField') {
      return (
        <div className="section">
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
       </div>
      );
    }

    if (type === 'NgagerErrorMessage') {
      return (
        <div className="section">
          <NgagerErrorMessage />
        </div>
      );
    }

    if (type === 'NgagerTreeView') {
      const data = {
        name: 'Parent',
        children: [
          {
            id: 1,
            name: 'Child 1',
          },
          {
            id: 2,
            name: 'Child 2',
            children: [
              {
                id: 21,
                name: 'Grand Child 21',
                children: [
                  {
                    id: 211,
                    name: 'Grand Child Child 211',
                    children: [
                      {
                        id: 2111,
                        name: 'Grand Child Child 2111',
                        children: [
                          {
                            id: 21111,
                            name: 'Grand Child Child 21111',
                            children: [
                              {
                                id: 211111,
                                name: 'Grand Child Child 211111',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 22,
                name: 'Grand Child 22',
              },
              {
                id: 23,
                name: 'Grand Child 23',
              },
              {
                id: 24,
                name: 'Grand Child 24',
              },
              {
                id: 25,
                name: 'Grand Child 25',
              },
              {
                id: 26,
                name: 'Grand Child 26',
              },
              {
                id: 27,
                name: 'Grand Child 27',
              },
            ],
          },
        ],
      }
      return (
        <div className="section">
          <NgagerTreeView
            thickness={3}
            data={data}
            renderItem={item => (
              <div className="card">
                <span className="title">{item.name}</span>
              </div>
            )}
          />
       </div>
      );
    }

    return null;
  }

  render () {
    return (
      <div className="container">
        <div className="buttons">
          <button id="NgagerSearchField" onClick={this.handleOnClick}>NgagerSearchField</button>
          <button id="CircularProgress" onClick={this.handleOnClick}>CircularProgress</button>
          <button id="NgagerSelectField" onClick={this.handleOnClick}>NgagerSelectField</button>
          <button id="NgagerErrorMessage" onClick={this.handleOnClick}>NgagerErrorMessage</button>
          <button id="NgagerTreeView" onClick={this.handleOnClick}>NgagerTreeView</button>
        </div>
        {this.renderComponent()}
      </div>
    );
  }
}
