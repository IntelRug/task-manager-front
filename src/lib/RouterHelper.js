export function paramInt(name, defaultParams) {
  return (params) => {
    const localParams = params || defaultParams;
    if (Object.prototype.hasOwnProperty.call(localParams, name)) {
      return /^([1-9]([0-9]+)?)$/.test(localParams[name])
        ? parseInt(localParams[name], 10)
        : -1;
    }
    return -1;
  };
}
