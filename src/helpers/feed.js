/**
 * It creates AssociatedThemeObject with ids of themes as a key of the object
 * @param {Array} feedList array of objects include themes array with id of theme
 * @param {Object} themeObj previews AssociatedThemeObject if it exists, empty object otherwise
 * @returns {Object} object with themes ids as keys (for example, { 6371: "n/a", 6374: "n/a" })
 */
export const getAssociatedThemeObject = (feedList = [], themeObj = {}) => {
  const newThemeObj = { ...themeObj };
  feedList.forEach((feedObj) => {
    feedObj.themes && feedObj.themes.map((theme) => {
      if (!themeObj[theme.theme_id]) {
        newThemeObj[theme.theme_id] = 'n/a';
      }
    });
  });
  return newThemeObj;
};
