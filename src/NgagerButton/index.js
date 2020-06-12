import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import ConfirmationDialog from '../ConfirmationDialog';
import { NGAGER_COLOR_BRAND } from '../theme';

class NgagerButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openConfirmDialog: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  async handleOnClick(e) {
    if (this.props.isProcessing || this.props.disabled) {
      return;
    }
    if (this.props.confirmMessage) {
      if (this.state.openConfirmDialog === false) {
        this.setState({ openConfirmDialog: true });
        return;
      }
      this.setState({ openConfirmDialog: false });
    }
    await this.props.onClick(e);
    if (this.props.link && this.props.history !== null) {
      this.props.history.push(this.props.link);
    }
  }

  renderButtonContent(style = {}) {
    return (
      <div style={style}>
        {this.props.icon && (
          <FontIcon
            className={`${this.props.icon} icon`}
            style={{ fontSize: 20, marginRight: 10, color: 'inherit' }}
          />
        )}
        <span>{this.props.buttonText}</span>
      </div>
    );
  }

  renderConfirmationDialog() {
    if (!this.props.confirmMessage || !this.state.openConfirmDialog) {
      return null;
    }
    return (
      <ConfirmationDialog
        open
        type="confirm"
        title={this.props.confirmMessage}
        onClickOK={this.handleOnClick}
        onClickCancel={() => this.setState({ openConfirmDialog: false })}
      />
    );
  }

  renderContent() {
    let className = 'ngager-button';
    if (!this.props.rounded) {
      className = `${className} no-rounded`;
    }
    const iconStyle = !this.props.icon
      ? { fontSize: 14, marginRight: '5px' }
      : { fontSize: 14, color: 'inherit' };
    let backgroundColor;
    if (this.props.backgroundColor) {
      backgroundColor = this.props.backgroundColor;
    } else if (this.props.theme && this.props.theme.backgroundColor) {
      backgroundColor = this.props.theme.backgroundColor;
    } else {
      backgroundColor = NGAGER_COLOR_BRAND;
    }
    const style = Object.assign(
      {},
      { backgroundColor: backgroundColor, borderColor: backgroundColor },
      this.props.style,
    );
    if (this.props.isProcessing === true) {
      return (
        <button style={style} className={`${className} disabled`}>
          <FontIcon className="fa fa-circle-o-notch faa-spin animated" style={iconStyle} />
          {!this.props.icon && this.props.processingText}
        </button>
      );
    }
    if (this.props.disabled === true) {
      return (
        <button style={style} className={`${className} disabled`}>
          {this.renderButtonContent()}
        </button>
      );
    }
    if (this.props.link !== '' && this.props.link !== null && this.props.history === null) {
      return (
        <Link style={style} className={className} to={this.props.link} onClick={this.handleOnClick}>
          {this.renderButtonContent({ display: 'inline-block' })}
        </Link>
      );
    }
    return (
      <button onClick={this.handleOnClick} style={style} className={className}>
        {this.renderConfirmationDialog()}
        {this.renderButtonContent()}
      </button>
    );
  }

  render() {
    let className = this.props.className;
    if (this.props.fullWidth) {
      className = `${className} fullwidth`;
    }
    return <Container width={this.props.width} className={className}>{this.renderContent()}</Container>;
  }
}

const Container = styled.div`
.ngager-button {
  cursor: pointer;
  outline: none;
  background: none;
  background-color: @ngager_color_brand;
  color: white;
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 1em;
  width: ${({ width }) => width}
  min-height: 40;
  border: 1px solid;

  &.no-rounded {
    border-radius: 0;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

a.ngager-button {
  min-height: unset;
  text-align: center;
}

.ngager-button.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

&.fullwidth {
  width: 100%;

  .ngager-button {
    width: 100%;
  }
}
`

NgagerButton.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  width: PropTypes.number,
  history: PropTypes.instanceOf(Object),
  confirmMessage: PropTypes.string,
  rounded: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  buttonText: PropTypes.string,
  processingText: PropTypes.string,
  // iconColor: PropTypes.string,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  isProcessing: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)]),
};

NgagerButton.defaultProps = {
  className: '',
  fullWidth: false,
  width: 150,
  history: null,
  confirmMessage: null,
  rounded: true,
  icon: null,
  style: {},
  buttonText: '',
  iconColor: 'rgb(119, 128, 145)',
  processingText: 'Processing',
  theme: null,
  backgroundColor: null,
  disabled: false,
  isProcessing: false,
  onClick: () => null,
  link: null,
};

export default NgagerButton;
