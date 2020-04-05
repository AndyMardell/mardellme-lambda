const playing = require('./playing')
const saveTokens = require('./saveTokens')

module.exports = async ({ accessToken, refreshToken }) => {
  // This function currently doesn't do a lot
  // but may be used to map other API requests
  // in the future.

  if (accessToken && refreshToken) {
    await saveTokens({ accessToken, refreshToken })
  }

  return playing()
}
