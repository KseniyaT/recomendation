const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  REACT_APP_ENDPOINT: JSON.stringify(process.env.REACT_APP_ENDPOINT),
  REACT_APP_API: JSON.stringify(process.env.REACT_APP_API),
  REACT_APP_LOGIN: JSON.stringify(process.env.REACT_APP_LOGIN_URL),
  REACT_APP_FEED: JSON.stringify(process.env.REACT_APP_FEED_URL),
  REACT_APP_THEMES: JSON.stringify(process.env.REACT_APP_THEMES_URL),
  REACT_APP_REVIEWS: JSON.stringify(process.env.REACT_APP_REVIEWS_URL),
};
