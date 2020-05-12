/* eslint react/no-find-dom-node: 0 */
/* eslint react/no-unused-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import _flow from 'lodash/flow';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.id,
      item: props.item,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMovingItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
  drop(props) {
    props.onChangeItemsSequence();
  },
};

const withDrag = DragSource(props => props.name, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}));

const withDrop = DropTarget(props => props.name, cardTarget, (dragConnect, monitor) => ({
  connectDropTarget: dragConnect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}));

class SortableItem extends Component {
  render() {
    const {
      item,
      isDragging,
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragPreview(
      connectDropTarget(
        <div className="sortable-item" style={{ opacity }} key={item.id}>
          {connectDragSource(<i className="fa fa-arrows" aria-hidden="true" style={{ cursor: 'move' }}></i>)}
          {this.props.renderItem(item)}
        </div>,
      ),
    );
  }
}

SortableItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // length: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editLink: PropTypes.string,
    name: PropTypes.string,
    theme: PropTypes.instanceOf(Object),
  }).isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default _flow([withDrag, withDrop])(SortableItem);
