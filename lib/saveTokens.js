const AWS = require('aws-sdk')

module.exports = ({ accessToken, refreshToken, environment }) => {
  console.log('Updating tokens')

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  return new Promise((resolve, reject) => {
    dynamodb.updateItem(
      {
        ExpressionAttributeNames: {
          '#A': 'AccessToken',
          '#R': 'RefreshToken',
        },
        ExpressionAttributeValues: {
          ':a': {
            S: accessToken,
          },
          ':r': {
            S: refreshToken,
          },
        },
        Key: {
          Environment: {
            S: environment || 'production',
          },
        },
        ReturnValues: 'ALL_NEW',
        TableName: 'Auth',
        UpdateExpression: 'SET #A = :a, #R = :r',
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
