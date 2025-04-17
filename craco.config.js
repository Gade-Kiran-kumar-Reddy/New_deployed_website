module.exports = {
  style: {
    postcss: {
      mode: 'extends', // Add this line
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions = {
          ident: 'postcss',
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        };
        return postcssLoaderOptions;
      },
    },
  },
};