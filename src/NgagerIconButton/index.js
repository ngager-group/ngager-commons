import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '../CircularProgress';
import { isPromise } from '../utils';
import ConfirmationDialog from '../ConfirmationDialog';

class NgagerIconButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      openConfirmDialog: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClickOnIcon = this.handleClickOnIcon.bind(this);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleOnClick() {
    if (this.state.isProcessing || this.props.disabled || this.props.onClick === null) {
      return;
    }
    this.setState({ isProcessing: true }, () => {
      Promise.all([this.props.onClick(this.props.data)]).then(() => {
        if (!this.mounted) {
          return;
        }
        this.setState({ isProcessing: false, openConfirmDialog: false });
      });
    });
  }

  handleClickOnIcon(e) {
    e.stopPropagation();
    e.preventDefault();
    let confirmMessage = null;
    if (this.props.getConfirmMessage) {
      const confirmMessageResp = this.props.getConfirmMessage();
      if (isPromise(confirmMessageResp)) {
        this.setState({ openConfirmDialog: true, confirmMessage: 'Loading...', isLoading: true });
        confirmMessageResp.then(m => {
          if (!m) {
            this.setState({ openConfirmDialog: false });
            this.handleOnClick();
            return;
          }
          this.setState({ isLoading: false, confirmMessage: m });
        })
        return;
      }
      confirmMessage = confirmMessageResp;
    } else if (this.props.confirmMessage) {
      confirmMessage = this.props.confirmMessage;
    }
    if (!confirmMessage) {
      this.handleOnClick();
      return;
    }
    if (this.state.isProcessing || this.props.disabled) {
      return;
    }
    this.setState({ openConfirmDialog: true, confirmMessage });
  }

  renderConfirmationDialog() {
    const { confirmMessage, openConfirmDialog, isLoading, isProcessing } = this.state;
    if (openConfirmDialog === false) {
      return null;
    }
    return (
      <ConfirmationDialog
        isLoading={isLoading}
        isProcessing={isProcessing}
        open
        type="confirm"
        title={confirmMessage}
        onClickOK={this.handleOnClick}
        onClickCancel={() => this.setState({ openConfirmDialog: false })}
      />
    );
  }

  render() {
    return (
      <Container
        className={`icon-button ${this.props.disabled ? 'disabled' : ''}`}
        style={this.props.style}
        role="button"
        tabIndex={0}
        onClick={this.handleClickOnIcon}
      >
        {this.renderConfirmationDialog()}
        {this.state.isProcessing ? (
          <CircularProgress thickness={1} size={14} />
        ) : (
          this.props.children
        )}
      </Container>
    );
  }
}

const Container = styled.div`
text-align: center;
cursor: pointer;
display: inline-block;
outline: none;

&.disabled {
  opacity: 0.5;
  cursor: no-drop;

  i {
    color: #bbb !important;
  }
}
`

NgagerIconButton.propTypes = {
  data: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  confirmMessage: PropTypes.string,
  getConfirmMessage: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

NgagerIconButton.defaultProps = {
  data: null,
  disabled: false,
  confirmMessage: null,
  getConfirmMessage: null,
  style: {},
  onClick: null,
};

export default NgagerIconButton;
