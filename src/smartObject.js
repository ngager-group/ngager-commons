import _get from 'lodash/get';
import _set from 'lodash/set';
import _clone from 'lodash/clone';

class SmartObject {
  constructor(data) {
    this.data = data;
    this.hasChanged = false;
  }

  get(path) {
    return _get(this.data, path, null);
  }

  set(path, val) {
    const data = this.data;
    if (_get(data, path, null) === val) {
      return;
    }
    _set(data, path, val);
    this.hasChanged = true;
  }

  reset() {
    this.hasChanged = false;
  }

  hasChanged() {
    return this.hasChanged;
  }

  getData(hasChanged) {
    if (this.hasChanged) {
      this.hasChanged = hasChanged;
      return _clone(this.data);
    }
    return this.data;
  }
}

export default SmartObject;
