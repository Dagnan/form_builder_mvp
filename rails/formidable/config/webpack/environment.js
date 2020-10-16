const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const path = require('path')

// environment.loaders.append('rules',
//   {
//     test: /\.css$/,
//     use: ['vue-style-loader', 'css-loader']
//   }
// )

// environment.loaders.append('rules',
//   {
//     test: /\.s(c|a)ss$/,
//     use: [
//       'vue-style-loader',
//       'css-loader',
//       {
//         loader: 'sass-loader',
//         // Requires sass-loader@^7.0.0
//         options: {
//           implementation: require('sass'),
//           fiber: require('fibers'),
//           indentedSyntax: true // optional
//         },
//         // Requires sass-loader@^8.0.0
//         options: {
//           implementation: require('sass'),
//           sassOptions: {
//             fiber: require('fibers'),
//             indentedSyntax: true // optional
//           },
//         },
//       },
//     ],
//   }
// )

// Avoids conflicts between webpacker and Vue stuff (sass vs. node-sass)

// Get the actual sass-loader config
const sassLoader = environment.loaders.get('sass')
const sassLoaderConfig = sassLoader.use.find(function(element) {
  return element.loader == 'sass-loader'
})

// Use Dart-implementation of Sass (default is node-sass)
const options = sassLoaderConfig.options
options.implementation = require('sass')

// vuetify
environment.plugins.prepend('VuetifyLoaderPlugin', new VuetifyLoaderPlugin())

// Avoids having the following error:
// You are using the runtime-only build of Vue where the template
// compiler is not available. Either pre-compile the templates into
// render functions, or use the compiler-included build.
environment.config.merge({
  resolve: {
    alias: {
      vue$: path.resolve(__dirname, '../../node_modules/vue/dist/vue.esm.js')
    }
  }
})

// vue-loader

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())

environment.loaders.prepend('vue', {
  test: /\.vue(\.erb)?$/,
  use: [{
    loader: 'vue-loader'
  }]
})

module.exports = environment
