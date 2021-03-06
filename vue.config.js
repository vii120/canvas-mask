module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/canvas-mask/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Canvas Mask | crop picture with what you paint',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
           @import "./src/styles/variables.scss";
        `,
      },
    },
  },
};
