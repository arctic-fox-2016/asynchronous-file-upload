module.exports = {
  entry: {
    app:"./resource/assets/js/app.js"

  },
  output : {
    path: __dirname + "/public/assets/js/",
    filename:"[name].js" // masuk ke resource /app.js
  },
  module: {
    loaders: [{
      test:/\.js$/,
      exclude:/node_modules/,
      loader:['babel-loader'],
      query: {
        presets:['es2015']
      }

    }]

  }

}
//jquery digabung jadi 1 di app.js
