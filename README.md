# ngager-commons

> Ngager common components

[![NPM](https://img.shields.io/npm/v/ngager-commons.svg)](https://www.npmjs.com/package/ngager-commons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ngager-commons
```

## Usage

```jsx
import React, { Component } from 'react'
import { NgagerSearchField, CircularProgress, NgagerSelectField } from 'ngager-commons'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleOnFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleOnStatusChange(status, dataset) {
    console.log(status);
    this.setState({ status });
  }

  render () {
    const { status, filterText } = this.state;
    return (
      <div className="container">
        <fieldset>
          <legend>NgagerSearchField</legend>
            <NgagerSearchField
              onChange={this.handleOnFilterTextChange}
              wait={500}
            />
          <span>Filter text: <b>{filterText}</b> </span>
       </fieldset>
       <fieldset>
         <legend>CircularProgress</legend>
         <div style={{ textAlign: 'center' }}>
           <CircularProgress />
         </div>
      </fieldset>
      <fieldset>
        <legend>NgagerSelectField</legend>
        <NgagerSelectField
          autoWidth
          name="status"
          data-id={222}
          data-label="Status"
          items={this.statusOptions}
          enableSelectAll
          selectAllLabel="All"
          placeholder="Status"
          onChange={this.handleOnStatusChange}
        />
        <span style={{ marginTop: 10, marginLeft: 1 }}>Status: <b>{status ? status.name : ''}</b> </span>
     </fieldset>
      </div>
    )
  }
}
```
## Example
https://ngager-group.github.io/ngager-commons/

## Components
#### NgagerSearchField
```jsx
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
```

#### CircularProgress
```jsx
CircularProgress.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  thickness: PropTypes.number,
  style: PropTypes.instanceOf(Object),
  mainColor: PropTypes.string,
};

CircularProgress.defaultProps = {
  className: '',
  color: null,
  size: 'regular',
  thickness: 3,
  style: null,
  mainColor: '#36425A',
};
```

#### NgagerSelectField
```jsx
NgagerSelectField.propTypes = {
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
```

#### NgagerErrorMessage
```jsx
NgagerErrorMessage.propTypes = {
  mainColor: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  i18n: PropTypes.instanceOf(Object),
  errors: PropTypes.instanceOf(Array),
  message: PropTypes.string,
  renderButton: PropTypes.func,
};

NgagerErrorMessage.defaultProps = {
  mainColor: '#36425A',
  style: {},
  i18n: null,
  errors: [],
  message: null,
  renderButton: null,
};
```

#### NgagerTreeView
```jsx
const data = {
  name: 'Parent',
  children: [
    {
      id: 1,
      name: 'Child 1',
    },
    ....


  NgagerTreeView.propTypes = {
    thickness: PropTypes.number,
    idField: PropTypes.string,
    childrenField: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.instanceOf(Object).isRequired,
    renderItem: PropTypes.func.isRequired,
  }

  NgagerTreeView.defaultProps = {
    thickness: 2,
    idField: 'id',
    childrenField: 'children',
    color: '#36425A',
  }
```

#### NgagerButton
```jsx
NgagerButton.propTypes = {
  className: PropTypes.string,
  history: PropTypes.instanceOf(Object),
  confirmMessage: PropTypes.string,
  rounded: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  buttonText: PropTypes.string,
  processingText: PropTypes.string,
  theme: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
  isProcessing: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)]),
};

NgagerButton.defaultProps = {
  history: null,
  confirmMessage: null,
  rounded: true,
  icon: null,
  style: {},
  buttonText: '',
  iconColor: 'rgb(119, 128, 145)',
  processingText: 'Processing',
  theme: {
    backgroundColor: '',
  },
  disabled: false,
  isProcessing: false,
  onClick: () => null,
  link: null,
};
```

#### NgagerGroupButtons
```jsx
NgagerGroupButtons.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.instanceOf(Array).isRequired,
  style: PropTypes.instanceOf(Object),
};

NgagerGroupButtons.defaultProps = {
  style: {},
};
```

#### ConfirmationDialog
```jsx
ConfirmationDialog.propTypes = {
  i18n: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onClickCancel: PropTypes.func,
  onClickOK: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  processingText: PropTypes.string,
  modal: PropTypes.bool,
};

ConfirmationDialog.defaultProps = {
  i18n: defaultTranslation,
  open: false,
  type: 'confirm',
  onClickCancel: null,
  isProcessing: false,
  processingText: 'Processing...',
  modal: false,
};
```

#### NgagerIconButton
```jsx
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
```


#### NgagerAvatar
```jsx
NgagerAvatar.propTypes = {
  style: PropTypes.instanceOf(Object),
  size: PropTypes.number,
  borderWidth: PropTypes.number,
  image: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  mainColor: PropTypes.string,
  toolTipId: PropTypes.string,
};

NgagerAvatar.defaultProps = {
  style: {},
  size: 185,
  borderWidth: 20,
  image: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onClick: null,
  mainColor: '#36425A',
  toolTipId: null,
};
```

#### SortableList
```jsx
SortableList.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(Object).isRequired,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  onChangeItemsOrder: PropTypes.func.isRequired,
};

SortableList.defaultProps = {
  className: '',
  keyExtractor: null,
};
```

#### EnhancedSelectField
```jsx
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
```

#### NgagerPagination
```jsx
NgagerPagination.propTypes = {
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
  defaultPage: PropTypes.number,
  displayPages: PropTypes.bool,
  className: PropTypes.string,
};

NgagerPagination.defaultProps = {
  pageSize: 30,
  defaultPage: 1,
  onChangePage: (p) => console.log(p),
  displayPages: true,
  className: '',
};
```

## License

MIT © [ngager-group](https://github.com/ngager-group)
