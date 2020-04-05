const handleRequest = require('./lib/handleRequest')
const generateResponse = require('./lib/generateResponse')

exports.handler = async (event, _, callback) => {
  const { body } = event
  const requestBody = body ? JSON.parse(body) : {}

  try {
    const data = await handleRequest(requestBody)
    console.log('No Error', { data })
    callback(null, generateResponse({ data }, 200))
  } catch (err) {
    if (err.errors) {
      const response = generateResponse({ error: 'Input error' }, 400)
      console.error('Input Error')
      return callback(null, response)
    }

    const response = generateResponse({ error: 'Internal server error' }, 500)
    console.error('Server Error')
    callback(null, response)
  }
}
