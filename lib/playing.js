const axios = require('axios')
const getTokens = require('./getTokens')
const refreshTokens = require('./refreshTokens')

const getPlaying = async () => {
  const { accessToken } = await getTokens()

  const playing = await axios(
    'https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const { is_playing: isPlaying, item: track } = await playing.data

  if (isPlaying) {
    return {
      isPlaying,
      track,
    }
  }

  const played = await axios(
    'https://api.spotify.com/v1/me/player/recently-played',
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const { items } = await played.data
  const lastPlayed = items[0]

  return {
    isPlaying,
    track: lastPlayed.track,
    lastPlayed: lastPlayed.played_at,
  }
}

module.exports = async () => {
  try {
    const playerData = await getPlaying()
    return playerData
  } catch (err) {
    try {
      await refreshTokens()
      return getPlaying()
    } catch (err) {
      console.error(err.message)
    }
  }
}
