import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import _trim from 'lodash/trim';
import _debounce from 'lodash/debounce';

class NgagerSearchField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.submitChangesDebounced = _debounce(this.submitChanges, props.wait);
    this.styles = {
      hintStyle: {
        top: '12px',
        fontStyle: 'italic',
        fontSize: '0.9em',
        alignItems: 'center',
        display: 'flex',
      },
      inputHeight: { height: props.height },
      underlineStyle: { borderColor: props.color },
    };
  }

  componentDidMount() {
    this.setState({ filter: this.props.initialValue }, () => {
      if (this.props.autoFocus) {
        this.textFilter.focus();
      }
    });
  }

  componentWillReceiveProps({ initialValue }) {
    if (this.props.initialValue !== initialValue) {
      this.handleOnFilterChange(initialValue);
    }
  }

  // componentDidUpdate(props, state) {
  //   if (this.state.filter !== state.filter && _trim(this.state.filter) !== _trim(state.filter)) {
  //     this.submitChangesDebounced(this.state.filter);
  //   }
  // }

  submitChanges(filter) {
    this.props.onChange(filter);
  }

  handleOnFilterChange(filter) {
    if (this.props.disabled) {
      return;
    }
    const hasChanged = this.state.filter !== filter && _trim(this.state.filter) !== _trim(filter);
    this.setState({ filter }, () => {
      if (hasChanged) {
        this.submitChangesDebounced(this.state.filter);
      }
    });
  }

  clearFilterText() {
    this.setState({ filter: '' });
    this.submitChanges('');
    this.textFilter.focus();
  }

  render() {
    const searchIconStyle =
      this.state.filter !== null && this.state.filter.length === 0
        ? { color: this.props.color }
        : {};
    const clearFilterIconStyle =
      this.state.filter !== null && this.state.filter.length > 0 ? {} : { display: 'none' };
    return (
      <Container style={this.props.style} className="search-box">
        <i className="fa fa-search" style={searchIconStyle} aria-hidden="true"></i>
        <TextField
          disabled={this.props.disabled}
          autoComplete="off"
          ref={el => {
            this.textFilter = el;
          }}
          name="filter"
          hintText={this.props.placeholder}
          hintStyle={this.styles.hintStyle}
          fullWidth
          onChange={(e, value) => this.handleOnFilterChange(value)}
          value={this.state.filter}
          style={this.styles.inputHeight}
          inputStyle={this.styles.inputHeight}
          underlineStyle={this.styles.underlineStyle}
          underlineFocusStyle={this.styles.underlineStyle}
          underlineShow={this.props.underlineShow}
        />
        {this.props.clearTextShow && (
          <i
            onClick={() => this.clearFilterText()}
            title={this.props.clearFilterText}
            style={clearFilterIconStyle}
            className="fa fa-times"
            aria-hidden="true"
          ></i>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
flex-basis: 100%;
max-height: 50px;
.fa-search {
  position: absolute;
  left: 0;
  font-size: 20px;
  -webkit-text-stroke-color: #f0f4fc;
  -webkit-text-stroke-width: 1px;
}

.fa-close {
  position: absolute;
  right: 0;
  cursor: pointer;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #f0f4fc;
  font-size: 20px;
}

.fa-times {
  position: absolute;
  right: 0;
  cursor: pointer;
  z-index: 1;
}

> div {
  div:first-child {
    padding-left: 25px !important;
  }
}
input[type='text'] {
  padding-left: 25px !important;
  padding-right: 25px;
}
`

NgagerSearchField.propTypes = {
  autoFocus: PropTypes.bool,
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
  autoFocus: true,
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

export default NgagerSearchField;
