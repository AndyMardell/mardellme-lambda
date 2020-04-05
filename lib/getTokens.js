const AWS = require('aws-sdk')

module.exports = () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  return new Promise((resolve, reject) => {
    dynamodb.get(
      {
        TableName: 'Auth',
        AttributesToGet: ['AccessToken', 'RefreshToken'],
        Key: {
          Environment: 'Production',
        },
      },
      (err, data) => {
        if (err) {
          reject(err.message)
        }

        console.log(data)

        resolve(data.Item)
      }
    )
  })
}
