import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from '../CircularProgress';
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
      Promise.all([this.props.onClick()]).then(() => {
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
    if (!this.props.confirmMessage) {
      this.handleOnClick();
      return;
    }
    if (this.state.isProcessing || this.props.disabled) {
      return;
    }
    this.setState({ openConfirmDialog: true });
  }

  renderConfirmationDialogForDeleting() {
    const { openConfirmDialog } = this.state;
    if (openConfirmDialog === false) {
      return null;
    }
    return (
      <ConfirmationDialog
        isProcessing={this.state.isProcessing}
        open
        type="confirm"
        title={this.props.confirmMessage}
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
        {this.renderConfirmationDialogForDeleting()}
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

&.disabled {
  opacity: 0.5;
  cursor: no-drop;

  i {
    color: #bbb !important;
  }
}
`

NgagerIconButton.propTypes = {
  disabled: PropTypes.bool,
  confirmMessage: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

NgagerIconButton.defaultProps = {
  disabled: false,
  confirmMessage: null,
  style: {},
  onClick: null,
};

export default NgagerIconButton;
