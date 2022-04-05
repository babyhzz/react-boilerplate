const config = require(`./config.${process.env.BUILD_ENV || 'dev'}`);

export default {
  baseUrl: config.BASE_URL
}