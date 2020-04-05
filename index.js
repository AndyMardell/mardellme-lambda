const handleRequest = require('./lib/handleRequest')
const generateResponse = require('./lib/generateResponse')

exports.handler = async (event, _, callback) => {
  const { body } = event
  const request = JSON.parse(body)

  try {
    const data = await handleRequest(request)
    callback(null, generateResponse({ data }, 200))
  } catch (err) {
    if (err.errors) {
      const response = generateResponse({ error: 'Input error' }, 400)
      return callback(null, response)
    }

    const response = generateResponse({ error: 'Internal server error' }, 500)
    callback(null, response)
  }
}
