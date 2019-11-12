module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-optional-chaining"],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  }
};