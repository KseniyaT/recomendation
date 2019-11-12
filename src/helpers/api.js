import utils from './utils';

export default (() => {
  /**
   * It checks which protocol the page has
   * @returns {String} current protocol: "https" if the page protocol is https, "http" otherwise
   */
  const _getGatewayProtocol = () => {
    return (window.location.protocol === 'https:') ? 'https://' : 'http://';
  };

  /**
   * It converts object data from the passed object to a string looks like "?key1=value1&key2=value2.."
   * @param {*} obj - object to converts
   * @returns {String} search string for url or empty string if the param is not obj or empty obj
   */
  const _objToSearchQuery = (obj) => {
    if (!(utils.isObject(obj) && Object.keys(obj).length)) return '';
    const urlParams = new URLSearchParams(Object.entries(obj));
    return '?' + urlParams;
  };

  /**
   * When an user logs in to the service,
   * then we write the token to the localSrorage.
   * When they next time open the page,
   * we consider that the user is logged in if there is a token value in the localStorage.
   * The function checks for the presence of a token in the localStorage
   * @returns {Boolean} true if there is a token in localStorage, false otherwise
   */
  const _isUserLogged = () => {
    return !!localStorage.getItem('token');
  };

  return {
    getGatewayProtocol: _getGatewayProtocol,
    objToSearchQuery: _objToSearchQuery,
    isUserLogged: _isUserLogged,
  };
})();
