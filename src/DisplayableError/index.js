import i18n from '../i18n';

class DisplayableError extends Error {
  constructor(key, variables, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DisplayableError);
    }

    this.type = 'DisplayableError';

    this.message = i18n.t(key, variables);
  }

  // type: 'DisplayableError';
}

export default DisplayableError;
