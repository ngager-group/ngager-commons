import React, { Component } from 'react'
import { NgagerSearchField, NgagerSelectField, NgagerErrorMessage, NgagerTreeView, ConfirmationDialog, NgagerButton, NgagerGroupButtons, NgagerIconButton, CircularProgress } from 'ngager-commons'

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

    if (type === 'ConfirmationDialog') {
      return (
        <div className="section">
          <ConfirmationDialog
            open
            type="confirm"
            title="This is confirmation text!"
            onClickOK={() => {
              console.log('Click OK');
              this.setState({ type: null });
            }}
            onClickCancel={() => {
              console.log('Click Cancel');
              this.setState({ type: null });
            }}
          />
       </div>
      );
    }

    if (type === 'NgagerGroupButtons') {
      const buttons = [
        <NgagerButton
          rounded={false}
          key={0}
          style={{
            width: 200,
            backgroundColor: '#fff',
            borderColor: '#bbb',
            color: '#36425A',
          }}
          buttonText="Back"
        />,
        <NgagerButton
          rounded={false}
          key={1}
          style={{ width: 200 }}
          buttonText="Endorse"
        />,
      ];
      return (
        <div className="section">
          <NgagerGroupButtons buttons={buttons} />
       </div>
      );
    }

    if (type === 'NgagerIconButton') {
      return (
        <div className="section">
          <div style={{ width: 50, height: 50, margin: 'auto' }}>
            <NgagerIconButton
              confirmMessage={'Do you want to remove this item?'}
              onClick={() => console.log('Confirm!')}
            >
              <i style={{ fontSize: 50, color: 'orangered' }} className="fa fa-times-circle" aria-hidden="true"></i>
            </NgagerIconButton>
          </div>
        </div>
      )
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
          <button id="ConfirmationDialog" onClick={this.handleOnClick}>ConfirmationDialog</button>
          <button id="NgagerGroupButtons" onClick={this.handleOnClick}>NgagerGroupButtons</button>
          <button id="NgagerIconButton" onClick={this.handleOnClick}>NgagerIconButton</button>
        </div>
        {this.renderComponent()}
      </div>
    );
  }
}
