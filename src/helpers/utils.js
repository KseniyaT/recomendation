export default (() => {
  /**
   * It checks if the passed parameter is an object
   * @param {*} value - value to check if it is an object
   * @returns {boolean} true if the value is an object, false otherwise
   */
  const _isObject = (value) => {
    return !!value && typeof value === 'object' && value.constructor === Object;
  };

  /**
   * It creates unique value to use as a key in cycle react component
   * @param {String} prefix - any string value to add
   * @returns {String} unique string
   */
  const _generateUniqKey = (prefix) => {
    return `${prefix}_${(~~(Math.random()*1e8)).toString(16)}`;
  };

  /**
   * It counts height of elements in NodeCollection
   * @param {Array} lis - array of nodes with height
   * @returns {Number} height of all elements in lis
   */
  const _getLisHeight = (lis) => {
    if (!Array.isArray(lis)) {
      throw new TypeError('Corresponding value should be an array');
    }
    return lis.reduce((sum, current) => {
      return sum + current.clientHeight;
    }, 0);
  };

  return {
    isObject: _isObject,
    generateUniqKey: _generateUniqKey,
    getLisHeight: _getLisHeight,
  };
})();
