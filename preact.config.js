import webpack from 'webpack';

module.exports = function(config) {
  config.plugins.push(
    new webpack.EnvironmentPlugin({'BIBSERVERURL': 'http://localhost:8000'})
  );
}
