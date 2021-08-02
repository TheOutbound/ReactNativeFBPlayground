require('dotenv').config()
export default ({ config }) => ({
  ...config, // extend app.json
  extra: {
    FB_ID_STAGING: process.env.FB_ID_STAGING,
    FB_NAME_STAGING: process.env.FB_NAME_STAGING
  }
})
