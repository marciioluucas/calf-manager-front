export default {
  map(params) {
    if (typeof params !== 'undefined') {
      const arrObjKeys = Object.keys(params);
      let arrToReturn = arrObjKeys.map((key) => {
        return `${key}=${params[key]}`;
      })
      return `?${arrToReturn.join('&')}`;
    }
    return '';
  }
}
