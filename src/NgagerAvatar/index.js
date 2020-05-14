import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resizeImage } from '../utils';

const NgagerAvatar = ({ style, image, size, borderWidth, onClick, onMouseEnter, onMouseLeave, mainColor, toolTipId }) => {
  const noPhoto =
    !image ||
    image.indexOf('assets/img/icon-profile.png') >= 0 ||
    image.indexOf('default_user_icon.jpg') >= 0;
  const props = {
    mainColor,
    size,
    style,
    className: 'ngager-avatar',
  }
  if (onClick) {
    Object.assign(props, {
      className: 'ngager-avatar clickable',
      role: 'button',
      tabIndex: 0,
      onClick,
    })
  }
  if (onMouseEnter) {
    Object.assign(props, { onMouseEnter });
  }
  if (onMouseLeave) {
    Object.assign(props, { onMouseLeave });
  }
  if (toolTipId) {
    Object.assign(props, {
      'data-tip': true,
      'data-for': toolTipId,
    })
  }
  return (
    <Container {...props} >
      <div>
        {noPhoto === false ? (
          <div className="avatar" style={{ backgroundImage: `url(${resizeImage(image, size)})` }} />
        ) : (
          <div className="avatar">
            <i className="fa fa-user user-icon" aria-hidden="true" />
          </div>
        )}
        {noPhoto === false && <div className="circle" style={{ borderWidth }} />}
      </div>
    </Container>
  );
};

const Container = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: ${({ size }) => size};
height: ${({ size }) => size};
font-size: ${({ size }) => size / 2};
margin: 0;

&.clickable {
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 0.8;
  }
}

> div {
  overflow: hidden;
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .circle {
    position: absolute;
    width: ${({ size, borderWidth }) => size - borderWidth * 2};
    height: ${({ size, borderWidth }) => size - borderWidth * 2};
    border-radius: 100%;
    border: 20px solid #dddddd99;
  }

  .avatar {
    color: #fff;
    background-color: ${({ mainColor }) => mainColor};
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: flex;
    background-size: cover;

    i.user-icon {
      margin: auto;
    }
  }
}

&.no-border {
  .circle {
    border: none;
  }
}
`

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

export default NgagerAvatar;
