export default {
  map(params) {
    const arrObjKeys = Object.keys(params);
    return arrObjKeys.map((key) => {
      return `${key}=${params[key]}`;
    })
  }
}
