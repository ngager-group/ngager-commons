import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { NgagerSearchField, NgagerSelectField, NgagerErrorMessage, NgagerTreeView, ConfirmationDialog, NgagerButton, NgagerGroupButtons, NgagerIconButton, CircularProgress, eventListener, NgagerAvatar } from 'ngager-commons'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      filterText: '',
      status: null,
      dataTip: null,
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

  // componentDidMount() {
  //   this.props.addEventListener('click', this.handleOnClick);
  // }

  componentDidUpdate() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 300);
  }

  handleOnFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleOnStatusChange(status) {
    console.log(status);
    this.setState({ status });
  }

  handleOnClick(e) {
    console.log('handleOnClick', e);
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

    if (type === 'NgagerAvatar') {
      return (
        <div className="section">
          <NgagerAvatar
            style={{ margin: 'auto' }}
            onMouseLeave={() => console.log('dsadsasa')}
            onMouseEnter={() => console.log('onMouseEnter')}
            toolTipId="profile-popover"
            size={200}
            onClick={e => console.log(e.target)}
            image="https://awesomecloudstorage.blob.core.windows.net/profilepictures/7993c74f-c53c-4c01-8ae3-98638e9b2559.jpg"
          />
          <NgagerAvatar
            toolTipId="profile-popover"
            style={{ margin: 'auto' }}
            size={200}
            onClick={e => console.log(e.target)}
            image={null}
          />
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
          <button id="NgagerAvatar" onClick={this.handleOnClick}>NgagerAvatar</button>
        </div>
        {this.renderComponent()}
        <ReactTooltip id="profile-popover" effect="solid" aria-haspopup="true" place="right" >
           <p>This is a global react component tooltip</p>
           <p>You can put every thing here</p>
           <ul>
             <li>Word</li>
             <li>Chart</li>
             <li>Else</li>
           </ul>
        </ReactTooltip>
      </div>
    );
  }
}

App.propTypes = {
  // addEventListener: PropTypes.func.isRequired,
};

export default eventListener(App);
