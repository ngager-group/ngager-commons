import Api from '../Api';

export function login(username, password) {
  return Api.post(
    '/token',
    {
      grant_type: 'password',
      username: username,
      password: password,
    },
    null,
    true,
  )
    .then(resp => {
      if (resp) {
        return resp;
      }
      return null;
    })
    .catch(ex => {
      console.log('exception get token', ex);
      return null;
    });
}

export function refreshToken(username, token) {
  return Api.post(
    '/token',
    {
      grant_type: 'refresh_token',
      username: username,
      refresh_token: token,
    },
    null,
    true,
  )
    .then(resp => {
      if (resp) {
        return resp;
      }
      return null;
    })
    .catch(ex => {
      console.log('exception refresh_token', ex);
      return null;
    });
}

export function saveUserAgreement(isAgreed) {
  return Api.post('/api/user/agreement', { hasAcceptedAgreement: isAgreed })
    .then(() => true)
    .catch(ex => {
      console.log('saveUserAgreement', ex);
      return false;
    });
}

export function signOut(tokenId) {
  return Api.post('/api/account/signout', {
    tokenId: tokenId,
  })
    .then(resp => {
      if (resp) {
        return resp;
      }
      return null;
    })
    .catch(ex => {
      console.log('error signout', ex);
      return null;
    });
}

export function setPasswordForTheFirstTime(password, code) {
  return Api.post('/api/account/firsttimelogin', { password, code });
}

export function resetForgottenPassword(password, code) {
  return Api.post('/api/account/password/update', { password, code });
}

export function changePassword(currentPassword, newPassword) {
  return Api.post('/api/account/password', { currentPassword, newPassword })
    .then(() => true)
    .catch(() => false);
}
