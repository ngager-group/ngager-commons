import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import SelectField from 'material-ui/SelectField';
import styled from 'styled-components';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from '../CircularProgress';

function stripHtml(content) {
  const div = document.createElement('div');
  div.innerHTML = content;
  return div.textContent || div.innerText || '';
}

function getInitialValue(multiple, defaultValue, selectAllValue, keyField) {
  if (multiple) {
    if (defaultValue) {
      return defaultValue.map(e => e[keyField]);
    }
    return [];
  }
  if (defaultValue) {
    return defaultValue[keyField];
  }
  return selectAllValue;
}

function selectionRenderer() {
  return null;
}

class NgagerSelectField extends PureComponent {
  constructor(props) {
    super(props);
    const { defaultValue, keyField, multiple, selectAllValue } = props;
    this.state = { value: getInitialValue(multiple, defaultValue, selectAllValue, keyField) };
    this.handleChange = this.handleChange.bind(this);
    const color = this.props.color;
    this.styles = {
      container: Object.assign({}, props.style, { color, borderColor: `${color}4D` }),
      selectField: {
        style: { height: 35 },
        menuStyle: { height: 35, fontSize: 14, lineHeight: '14px', paddingLeft: 10 },
        iconStyle: { display: 'none' },
        underlineStyle: { display: 'none' },
      },
    };
    this.submitChangesDebounced = _debounce(this.submitChanges, props.wait);
  }

  componentDidUpdate(prevProps, prevState) {
    const value = this.state.value;
    if (value !== prevState.value) {
      const { multiple, items, keyField } = this.props;
      if (multiple) {
        const selectedItems = items.filter(e => value.includes(e[keyField]));
        this.submitChangesDebounced(selectedItems);
      } else {
        const selectedItem = !value ? null : items.find(e => e[keyField] === value);
        this.submitChangesDebounced(selectedItem === undefined ? null : selectedItem);
      }
    }
  }

  getSelectedText() {
    const { multiple, keyField, nameField, items } = this.props;
    const { enableSelectAll, selectAllValue, selectAllLabel } = this.props;
    const value = this.state.value;
    if (multiple) {
      if (value.length === 0) {
        if (enableSelectAll) {
          return selectAllLabel;
        }
        return null;
      }
      const selectedItems = items.filter(e => value.includes(e[keyField]));
      return selectedItems.map(e => e[nameField]).join(', ');
    } else {
      if (enableSelectAll && value === selectAllValue) {
        return selectAllLabel;
      }
      if (value === null) {
        return null;
      }
      const selectedItem = items.find(e => e[keyField] === value);
      if (selectedItem === undefined) {
        return null;
      }
      return selectedItem[nameField];
    }
  }

  submitChanges(value) {
    this.props.onChange(value, this.props.data);
  }

  handleChange(event, index, value) {
    // console.log('handleChange', value);
    const { multiple, enableSelectAll, selectAllValue } = this.props;
    if (multiple && enableSelectAll) {
      let allSegments = value;
      if (allSegments.includes(selectAllValue)) {
        allSegments = [];
      } else {
        allSegments = value.filter(e => e !== selectAllValue);
      }
      this.setState({ value: allSegments });
      return;
    }
    this.setState({ value });
  }

  renderSelectField(isDisabled) {
    if (isDisabled) {
      return <div className="block-ui" />;
    }
    const items = [];
    const value = this.state.value;
    const {
      enableSelectAll,
      keyField,
      nameField,
      multiple,
      selectAllLabel,
      selectAllValue,
    } = this.props;
    if (enableSelectAll) {
      let checked = false;
      if (multiple) {
        checked = value.length === 0;
      } else if (!multiple && value !== null) {
        checked = value === selectAllValue;
      }
      items.push(
        <MenuItem
          key="null"
          checked={checked}
          value={selectAllValue}
          primaryText={selectAllLabel}
        />,
      );
    }
    this.props.items.forEach(item => {
      const id = item[keyField];
      const name = item[nameField];
      let checked = false;
      if (multiple && value.length > 0) {
        checked = value.includes(id);
      } else if (!multiple && value !== null) {
        checked = value === id;
      }
      items.push(
        <MenuItem checked={checked} value={id} key={id}>
          <span dangerouslySetInnerHTML={{ __html: name }} />
        </MenuItem>,
      );
    });

    return (
      <SelectField
        name="ngager-select"
        ref="selectbox"
        disabled={items.length === 0}
        style={this.styles.selectField.style}
        menuStyle={this.styles.selectField.menuStyle}
        iconStyle={this.styles.selectField.iconStyle}
        maxHeight={400}
        multiple={this.props.multiple}
        fullWidth={this.props.fullWidth}
        autoWidth={this.props.autoWidth}
        value={multiple ? value : undefined}
        selectionRenderer={selectionRenderer}
        onChange={this.handleChange}
        underlineStyle={this.styles.selectField.underlineStyle}
      >
        {items}
      </SelectField>
    );
  }

  renderRightButton() {
    const { color } = this.props;
    return (
      <div className="right-button">
        {this.props.isLoading ? (
          <CircularProgress thickness={2} size="small" color={color} />
        ) : (
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        )}
      </div>
    );
  }

  render() {
    const { disabled, isLoading } = this.props;
    const isDisabled = disabled || isLoading;
    const selectedText = this.getSelectedText();
    // console.log('selectedText', selectedText);
    return (
      <Container
        className={`ngager-selectfield ${isDisabled ? 'disabled' : ''}`}
        style={this.styles.container}
      >
        <div className="selected-value">
          {this.props.placeholder && <span>{this.props.placeholder}:</span>}
          {this.props.hintText && !selectedText && <span>{this.props.hintText}</span>}
          <span>{selectedText ? stripHtml(selectedText) : ''}</span>
        </div>
        <div className="select-field">{this.renderSelectField(isDisabled)}</div>
        {this.renderRightButton()}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  border: 1px solid #bfd6ff4d;
  border-radius: 6px;
  background-color: #6c81af4d;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40;

  &.disabled {
    opacity: 0.6;
    cursor: no-drop;

    .block-ui {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 99;
      display: flex;
    }
  }

  span.placeholder {
    text-align: left;
    width: 100%;
    padding-left: 10;
  }

  .selected-value {
    width: 100%;
    padding-left: 10;
    padding-right: 30;
    z-index: 1;
    display: flex;
    align-items: center;
    overflow: hidden;

    > span {
      &:first-child {
        white-space: nowrap;
      }

      &:last-child {
        padding-left: 5;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .select-field {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 3;
  }

  .right-button {
    position: absolute;
    z-index: 2;
    right: 10;
    width: 20;
    justify-content: center;
    display: flex;

    .fa-caret-down {
      cursor: pointer;
      font-size: 18px;
    }
  }

  > .fa {
    position: absolute;
    font-size: 18px;
    z-index: 2;

    &.fa-calendar {
      left: 10;
    }

    &.fa-caret-down {
      right: 10;
      cursor: pointer;
    }
  }
`

NgagerSelectField.propTypes = {
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Object)]),
  multiple: PropTypes.bool,
  autoWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  enableSelectAll: PropTypes.bool,
  selectAllValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectAllLabel: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.instanceOf(Array)]),
  placeholder: PropTypes.string,
  hintText: PropTypes.string,
  color: PropTypes.string,
  items: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func,
  keyField: PropTypes.string,
  nameField: PropTypes.string,
  wait: PropTypes.number,
};

NgagerSelectField.defaultProps = {
  style: {},
  data: null,
  multiple: false,
  autoWidth: false,
  fullWidth: true,
  disabled: false,
  isLoading: false,
  enableSelectAll: false,
  selectAllValue: null,
  selectAllLabel: '',
  defaultValue: null,
  placeholder: null,
  hintText: null,
  color: '#36425A',
  onChange: () => null,
  keyField: 'id',
  nameField: 'name',
  wait: 0,
};

export default NgagerSelectField;
