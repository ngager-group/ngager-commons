import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CircularProgress = props => {
  const { className, size, style, thickness, mainColor } = props;
  let ringSize;
  let ringStyle = null;
  if (typeof size === 'number') {
    ringStyle = {
      width: size,
      height: size,
    };
  } else {
    ringSize = size;
  }
  const color = props.color || mainColor;
  return (
    <Container color={color} thickness={thickness} style={style}>
      <div className={`lds-ring ${className} ${ringSize}`} style={ringStyle}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;

    > div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border: ${({ color, thickness }) => `${thickness}px solid ${color}`}
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color:${({ color }) => `${color} transparent transparent`};
    }

    &.small {
      width: 15px;
      height: 15px;
    }

    &.big {
      width: 60px;
      height: 60px;
    }
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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

export default CircularProgress;
