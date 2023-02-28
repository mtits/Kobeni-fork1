import crypto from 'crypto'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Webhook Decryptor',
})

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

    // Decrypt, returns string
    const result = decipher.update(cipherText) + decipher.final()

    // parse to json
    const objResult = JSON.parse(result)

    // log to server before returning
    logger.info(objResult, `Webhook Decryption Result`)

    return objResult
  } catch (error) {
    logger.error(error, 'Decryption Error')
    return { error }
  }
})
