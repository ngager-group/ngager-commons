import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NgagerGroupButtons = props => {
  return (
    <Container style={props.style} className={`group-buttons ${props.className}`}>
      {props.buttons}
    </Container>
  );
}

const Container = styled.div`
display: flex;
flex: 1;
justify-content: center;
margin-top: 30;
margin-bottom: 30;
min-height: 40;
max-height: 40;

> div {
  .ngager-button {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-right-width: 0;
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20;
    padding-right: 20;

    &:hover {
      background-color: antiquewhite !important;
      color: #36425a;
    }

  }

  &:first-child {
    .ngager-button {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-left: 1px solid;
    }
  }

  &:last-child {
    .ngager-button {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      border-right: 1px solid;
    }
  }

  > a.ngager-button {
    color: #fff;
    padding: 0;
  }
}

`

NgagerGroupButtons.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.instanceOf(Array).isRequired,
  style: PropTypes.instanceOf(Object),
};

NgagerGroupButtons.defaultProps = {
  className: '',
  style: {},
};

export default NgagerGroupButtons;
