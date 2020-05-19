import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EnhancedSelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
    const { fontSize, height, hintText, hintStyle, underlineStyle } = props;
    this.styles = {
      style: { fontSize, height },
      labelStyle: { height, lineHeight: `${height}px`, top: 0, paddingRight: height },
      iconStyle: { padding: 0, width: height, height: height },
    };
    this.selectFieldProps = {
      style: Object.assign({}, this.styles.style, props.style),
      labelStyle: this.styles.labelStyle,
      iconStyle: this.styles.iconStyle,
    }
    if (hintText) {
      this.selectFieldProps.hintText = hintText;
    }
    if (hintStyle) {
      this.selectFieldProps.hintStyle = hintStyle;
    }
    if (underlineStyle) {
      this.selectFieldProps.underlineStyle = underlineStyle;
    }
  }

  getDataSet() {
    const dataset = {};
    Object.keys(this.props).forEach(key => {
      if (key.startsWith('data-')) {
        dataset[key.replace('data-', '')] = this.props[key];
      }
    });
    return dataset;
  }

  handleOnSelectChange(e, key, value) {
    // console.log('handleOnSelectChange', value);
    this.setState({ value });
    this.props.onChange(value, this.getDataSet());
  }

  render() {
    const { value } = this.state;
    const { items } = this.props;
    return (
      <SelectField
        {...this.selectFieldProps}
        fullWidth
        value={value}
        onChange={this.handleOnSelectChange}
      >
        {items.map(item => this.props.renderItem(item))}
      </SelectField>
    );
  }
}

EnhancedSelectField.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hintText: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  hintStyle: PropTypes.instanceOf(Object),
  underlineStyle: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array),
  renderItem: PropTypes.func,
  onChange: PropTypes.func,
  fontSize: PropTypes.number,
  height: PropTypes.number,
};

EnhancedSelectField.defaultProps = {
  defaultValue: null,
  hintText: null,
  hintStyle: null,
  underlineStyle: null,
  fontSize: 14,
  height: 50,
  renderItem: item => <MenuItem key={item.id} value={item.id} primaryText={item.name} />,
};

export default EnhancedSelectField;
