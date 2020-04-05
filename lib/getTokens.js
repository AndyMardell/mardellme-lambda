const AWS = require('aws-sdk')

module.exports = () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  return new Promise((resolve, reject) => {
    dynamodb.getItem(
      {
        AttributesToGet: ['AccessToken', 'RefreshToken'],
        TableName: 'Auth',
        Key: {
          Environment: {
            S: 'Production',
          },
        },
      },
      (err, data) => {
        if (err) {
          reject(err.message)
        }
        resolve(data)
      }
    )
  })
}
