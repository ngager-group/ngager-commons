const defaultTranslation = {
  t: text => text,
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function newGuid() {
  return `${s4()}${s4()}-${s4()}-'${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function isPromise(p) {
  return p && Object.prototype.toString.call(p) === '[object Promise]';
}

function isAwesomeFile(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  if (url.includes('awesomecloudstorage') || url.includes('awesome-images')) {
    return true;
  }
  return false;
}

function resizeImage(url, size, di = 'width') {
  if (!isAwesomeFile(url)) {
    return url;
  }
  const newUrl = `${url.replace(
    'https://awesomecloudstorage.blob.core.windows.net',
    'https://awesome-images.azureedge.net',
  )}?${di}=${size}&autorotate=true`;
  return newUrl;
}

export { defaultTranslation, newGuid, resizeImage, isPromise };
