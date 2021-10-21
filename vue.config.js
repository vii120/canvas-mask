module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/lala/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'hello canvas',
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
