import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class NgagerTreeView extends PureComponent {
  componentDidMount() {
    // console.log('container', this.container, this.container.offsetWidth);
    // console.log('tree', this.tree, this.tree.offsetWidth);
    if (this.tree.offsetWidth > this.container.offsetWidth) {
      this.container.scrollLeft = (this.tree.offsetWidth - this.container.offsetWidth) / 2;
    }
  }

  renderChildren(children) {
    if (!children || children === undefined || children.length === 0) {
      return null;
    }
    return (
      <ul>
        {children.map(e => (
          <li key={e[this.props.idField]}>
            <div className="item">{this.props.renderItem(e)}</div>
            {this.renderChildren(e[this.props.childrenField])}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { thickness, color, data, childrenField } = this.props;
    return (
      <Container
        innerRef={el => { this.container = el || this.container; }}
        thickness={thickness}
        color={color}
      >
        <div className="tree" ref={el => { this.tree = el || this.tree; }}>
          <ul>
            <li>
              <div className="item">{this.props.renderItem(data)}</div>
              {this.renderChildren(data[childrenField])}
            </li>
          </ul>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
overflow: auto;
display: flex;
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
.tree {
  display: flex;
  flex: 1;
}

.tree ul {
  position: relative;
	padding: 1.5em 0;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

.tree li {
  display: inline-block; // need white-space fix
  vertical-align: top;
  text-align: center;
	list-style-type: none;
	position: relative;
	padding: 1.5em 1em 0 1em;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 50%;
    border-top: ${props => `${props.thickness}px solid ${props.color}`};
    width: 50%;
    height: 1.5em;
  }
  &::after {
    right: auto;
    left: 50%;
	  border-left: ${props => `${props.thickness}px solid ${props.color}`};
  }
  &:only-child::after,
  &:only-child::before {
    display: none;
  }
  &:only-child {
    padding-top: 0;
  }
  &:first-child::before,
  &:last-child::after {
    border: 0 none;
  }
  &:last-child::before{
    border-right: ${props => `${props.thickness}px solid ${props.color}`};
    border-radius: 0 5px 0 0;
  }
  &:first-child::after{
    border-radius: 5px 0 0 0;
  }
}

.tree ul ul::before{
	content: '';
	position: absolute;
  top: 0;
  left: 50%;
	border-left: ${props => `${props.thickness}px solid ${props.color}`};
	width: 0;
  height: 1.5em;
}

.tree li .item {
	// border: ${props => `${props.thickness}px solid ${props.color}`};
	padding: .5em .75em;
	text-decoration: none;
	display: inline-block;
	border-radius: 5px;
  color: #333;
  position: relative;
  top: 0;
  padding-top: 0;
  padding-bottom: 0;
  z-index: 9999;
}

.tree li .item:hover,
.tree li .item:hover+ul li a {
	// background: #e9453f;
  // color: #fff;
  // border: $border-width solid #e9453f;
}

.tree li .item:hover + ul li::after,
.tree li .item:hover + ul li::before,
.tree li .item:hover + ul::before,
.tree li .item:hover + ul ul::before{
	// border-color:  #e9453f;
}
`
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

export default NgagerTreeView;
