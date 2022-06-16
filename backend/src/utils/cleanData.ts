export const cleanData = (data: any, deleteKeys: string[] = ['value']) => {
  // There is nothing to be done if `data` is not an object
  if (typeof data !== 'object') {
    return;
  }

  // null object
  if (!data) {
    return;
  }

  Object.keys(data).forEach((key) => {
    if (deleteKeys.includes(key)) {
      delete data[key];
    } else {
      // If the key is not deleted from the current `data` object,
      // the value should be check for black-listed keys.
      cleanData(data[key], deleteKeys);
    }
  });
};
