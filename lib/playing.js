const axios = require('axios')
const getTokens = require('./getTokens')
const refreshTokens = require('./refreshTokens')

const getPlaying = async () => {
  const { accessToken } = getTokens()

  const playing = await axios('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const { artist, song, time } = await playing.data

    return {
      artist,
      song,
      time,
    }
}

module.exports = () => {  
  try {
    return getPlaying()
  } catch (err) {
    try {
      await refreshTokens()
      return getPlaying()
    } catch (err) {
      console.error(err.message)
    }
  }
}
