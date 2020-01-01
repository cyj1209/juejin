const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".scss"] = file => {};
}

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

module.exports = withSass({
  ...withCss()
});
