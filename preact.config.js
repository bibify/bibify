export default {
  webpack(config, env, helpers, options) {
    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    };
    console.log(config);
  }
}
