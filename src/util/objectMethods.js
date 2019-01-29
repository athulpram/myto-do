const addProperty = function(obj, key, value) {
  obj[key] = value;
  return obj;
};

const deleteProperty = function(obj, key) {
  delete obj[key];
  return obj;
};

module.exports = {
  addProperty,
  deleteProperty
};
