module.exports = (body, statusCode) => {
  return {
    headers: {
      'access-control-allow-methods': 'POST',
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
    },
    statusCode: statusCode,
    body: JSON.stringify(body),
  }
}
