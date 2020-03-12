import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoResultsImage from './images/no-results-image.png';

const NgagerErrorMessage = (props) => {
  const { i18n, style, mainColor, errors } = props;
  let messages;
  if (errors.length > 0) {
      messages = errors.map(e => e.message);
  } else if (props.message) {
    messages.push(props.message);
  } else {
    if (i18n) {
      messages.push(i18n.t('sorry_the_page_you_are_looking_for_does_not_exist'));
    } else {
      messages.push('Sorry, The page you are looking for does not exist');
    }
  }
  return (
    <Container mainColor={mainColor} className="page-not-found" style={style}>
      <div className="unauthorized-div animated shake">
        <img alt="No result" src={NoResultsImage} />
        {messages.map((m, id) => <p key={id}>{m}</p>)}
        {props.renderButton && props.renderButton()}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;

  > div {
    margin: auto;
    text-align: center;

    > p {
      margin-top: 20;
      font-weight: 100;
      opacity: 0.8;
      color: ${props => props.mainColor};

      &.text {
        font-size: 1em;
        opacity: 1;
        font-weight: bold;
      }

      &.description {
        font-size: 1em;
        opacity: 0.7;
        margin-top: 10;
      }
    }
  }
`

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

export default NgagerErrorMessage;
