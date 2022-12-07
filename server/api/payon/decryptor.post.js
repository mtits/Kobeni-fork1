import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    // Data from configuration
    const secretFromConfiguration = body.secretFromConfiguration

    // Data from server
    const ivfromHttpHeader = body.ivfromHttpHeader
    const authTagFromHttpHeader = body.authTagFromHttpHeader
    const httpBody = body.httpBody

    // Convert data to process
    const key = new Buffer.from(secretFromConfiguration, 'hex')
    const iv = new Buffer.from(ivfromHttpHeader, 'hex')
    const authTag = new Buffer.from(authTagFromHttpHeader, 'hex')
    const cipherText = new Buffer.from(httpBody, 'hex')

    // Prepare decryption
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)

    // Decrypt
    const result = decipher.update(cipherText) + decipher.final()
    console.log('Decryption Results:', JSON.parse(result))

    //
    return JSON.parse(result)

    //
  } catch (error) {
    console.log('Decryption Error:', error)
    return { ServerMsg: error }
  }
})
