module.exports = {
  entry: {
    bundle:'./main.jsx'
    },
  output: {
    filename: '[name].js'
  },
  module:{
    loaders:[
        {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },
         {test:/\.less$/, loader:'style!css!less?modules'}
    ]
  }

};