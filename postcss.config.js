module.exports = {
  plugins: [
    // Combine files on the CSS side
    require("postcss-import"),
    // Because browser's nested CSS causes specificity issues >:(
    require("postcss-nested").default,
    require('autoprefixer'),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
