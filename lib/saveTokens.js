const AWS = require('aws-sdk')

module.exports = ({ accessToken, refreshToken }) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient()

  return new Promise((resolve, reject) => {
    DynamoDB.update(
      {
        TableName: 'Auth',
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
            S: 'Production',
          },
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set AccessToken = :a, RefreshToken = :r',
      },
      (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
