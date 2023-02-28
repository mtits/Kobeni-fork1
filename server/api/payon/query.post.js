import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Query API',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const subDomain = body.mode == 'Test' ? 'eu-test' : 'eu-prod'
  let endPoint = ''
  let merchantTransactionId = undefined // axios note: params that are null or undefined are not rendered in the URL.

  if (body.searchType == 'paymentId') {
    endPoint = `https://${subDomain}.oppwa.com/v1/query/${body.referenceId}`
  } else {
    endPoint = `https://${subDomain}.oppwa.com/v1/query`
    merchantTransactionId = body.referenceId
  }

  try {
    const response = await axios({
      method: 'get',
      url: endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      params: {
        entityId: body.entityId,
        merchantTransactionId: merchantTransactionId,
      },
    })

    // log to server before returning
    logger.info(
      {
        requestData: {
          entityId: body.entityId,
          referenceId: body.referenceId,
          merchantTransactionId: merchantTransactionId,
        },
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Query operation successful`
    )

    return response.data
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: {
          entityId: body.entityId,
          referenceId: body.referenceId,
          merchantTransactionId: merchantTransactionId,
        },
        responseData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Query operation failed`
    )

    return error.response.data
  }
})
