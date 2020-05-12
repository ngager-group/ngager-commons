import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import update from 'immutability-helper';
import SortableItem from './sortableItem';

class SortableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
    this.handleOnMovingItem = this.handleOnMovingItem.bind(this);
    this.handleOnChangeItemsSequence = this.handleOnChangeItemsSequence.bind(this);
  }

  componentWillReceiveProps({ items }) {
    if (items !== this.props.items) {
      this.setState({ items });
    }
  }

  handleOnMovingItem(dragIndex, hoverIndex) {
    const dragItem = this.state.items[dragIndex];
    const newItems = update(this.state.items, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
    });
    this.setState({ items: newItems });
  }

  handleOnChangeItemsSequence() {
    this.props.onChangeItemsOrder(this.state.items);
  }

  render() {
    return (
      <Container className={`sortable-list ${this.props.className}`}>
        {this.state.items.map((item, index) => {
          const id = this.props.keyExtractor ? this.props.keyExtractor(item) : item.id;
          return (
            <SortableItem
              name={this.props.name}
              key={id}
              id={id}
              index={index}
              length={this.props.items.length}
              item={item}
              onMovingItem={this.handleOnMovingItem}
              renderItem={this.props.renderItem}
              onChangeItemsSequence={this.handleOnChangeItemsSequence}
            />
          )
        })}
      </Container>
    );
  }
}

const Container = styled.div`
position: relative;
  .sortable-item {
    position: relative;
    display: flex;
    align-items: center;

    .fa-arrows {
      position: absolute;
      left: 10;
      z-index: 99;
      font-size: 16;
      opacity: 0;
    }

    &:hover {
      .fa-arrows {
        opacity: 1;
      }
    }
  }
`

SortableList.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(Object).isRequired,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  onChangeItemsOrder: PropTypes.func.isRequired,
};

SortableList.defaultProps = {
  keyExtractor: null,
  className: '',
};

export default SortableList;
