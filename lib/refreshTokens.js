const axios = require('axios')
const getTokens = require('./getTokens')

module.exports = async () => {
  const { accessToken, refreshToken } = getTokens()

  const refresh = await axios('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
  })

  const tokens = await refresh.data
  await saveTokens(tokens)
}
