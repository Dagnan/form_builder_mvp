module.exports = {
  //mode: 'development',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
   rules: [
     {
       test: /\.css$/i,
       use: ['css-loader'],
     },
   ],
 },
};
