import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';
import NgagerButton from '../NgagerButton';
import CircularProgress from '../CircularProgress';
import { defaultTranslation } from '../utils';

const styles = {
  actionsContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 30,
    backgroundColor: '#f0f4fc',
  },
  bodyStyle: { backgroundColor: '#f0f4fc', paddingTop: 60 },
  buttons: {
    cancelOnly: {
      width: 200,
      height: 40,
      backgroundColor: '#FFF',
      border: '1px solid',
      color: '#36425A',
    },
    cancel: {
      width: 200,
      height: 40,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: '#FFF',
      border: '1px solid',
      color: '#36425A',
    },
    ok: { width: 200, height: 40, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  },
};

class ConfirmationDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.handleOnPressButtons = this.handleOnPressButtons.bind(this);
  }

  handleOnPressButtons(result) {
    if (result === 'CANCEL') {
      if (this.props.onClickCancel !== null) {
        this.props.onClickCancel();
      }
      return;
    }
    this.props.onClickOK();
  }

  renderTitle() {
    if (this.props.isLoading) {
      return <CircularProgress style={{ textAlign: 'center' }} />;
    }
    if (typeof this.props.title === 'string') {
      return (
        <p style={{ color: '#36425A', textAlign: 'center', fontSize: 18 }}>{this.props.title}</p>
      );
    }
    return this.props.title();
  }

  render() {
    const { open, isLoading } = this.props;
    if (open === false) {
      return null;
    }
    const title = (
      <DialogTitle className="dialog-title">
        <span></span>
        <div className="icon-container">
          <i className="fa fa-exclamation-triangle" style={{ color: 'orangered' }} />
        </div>
      </DialogTitle>
    );
    const i18n = this.props.i18n;
    if (this.props.type === 'warning') {
      const actions = [
        <NgagerButton
          key={0}
          isProcessing={this.props.isProcessing}
          buttonText={i18n.t('OK')}
          onClick={() => this.handleOnPressButtons('OK')}
        />,
      ];
      return (
        <Dialog
          className="ngager-dialog"
          title={title}
          actions={actions}
          open
          onRequestClose={() => this.handleOnPressButtons('OK')}
          autoDetectWindowHeight
          actionsContainerStyle={styles.actionsContainerStyle}
          bodyStyle={styles.bodyStyle}
        >
          {this.renderTitle()}
        </Dialog>
      );
    }
    const actions = [
      <NgagerButton
        key={0}
        style={isLoading ? styles.buttons.cancelOnly : styles.buttons.cancel}
        buttonText={i18n.t('Cancel')}
        onClick={() => this.handleOnPressButtons('CANCEL')}
      />,
    ];
    if (!isLoading) {
      actions.push(
        <NgagerButton
          key={1}
          style={styles.buttons.ok}
          buttonText={i18n.t('OK')}
          onClick={() => this.handleOnPressButtons('OK')}
          isProcessing={this.props.isProcessing}
          processingText={this.props.processingText}
        />,
      );
    }
    return (
      <Dialog
        className="ngager-dialog"
        title={title}
        actions={actions}
        open
        onRequestClose={() => this.handleOnPressButtons('CANCEL')}
        autoDetectWindowHeight
        modal={this.props.modal}
        actionsContainerStyle={styles.actionsContainerStyle}
        bodyStyle={styles.bodyStyle}
      >
        {this.renderTitle()}
      </Dialog>
    );
  }
}

const DialogTitle = styled.div`
background-color: #36425a;
display: flex;
align-items: center;
justify-content: center;
position: relative;
height: 80;
padding-top: 0 !important;

> span {
  color: #fff;
}

.icon-container {
  width: 80;
  height: 80;
  border-radius: 80px;
  background-color: #ffffff;
  align-self: center;
  position: absolute;
  bottom: -40;
  display: flex;

  .fa,
  .ngager-font {
    font-size: 30;
    margin: auto;
    color: #36425a;
  }
}

&.title {
  .fa {
    font-size: 40;
    margin: auto;
    color: #36425a;
  }

  span {
    color: #fff;
  }
}

`

ConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onClickCancel: PropTypes.func,
  onClickOK: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isProcessing: PropTypes.bool,
  processingText: PropTypes.string,
  modal: PropTypes.bool,
  i18n: PropTypes.instanceOf(Object),
};

ConfirmationDialog.defaultProps = {
  i18n: defaultTranslation,
  open: false,
  type: 'confirm',
  onClickCancel: null,
  isLoading: false,
  isProcessing: false,
  processingText: 'Processing...',
  modal: false,
};

export default ConfirmationDialog;
