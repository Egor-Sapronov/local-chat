const isProduction = process.env.NODE_ENV === 'production';

module.exports = isProduction ? require('./webpack.config.prod') : require('./webpack.config.dev');
