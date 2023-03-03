import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Query API',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let endPoint = ''
  let merchantTransactionId = undefined // axios note: params that are null or undefined are not rendered in the URL.

  /**
   * error handling required here because a reference ID is required
   */
  if (body.searchType == 'paymentId') {
    try {
      endPoint = oppwaEndPointFormatter(body.mode, 'QUERY', body.referenceId)
    } catch (error) {
      const msg = 'Invalid Request'
      logger.error(error, msg)

      return {
        kobeni: {
          error: msg,
          description: 'The reference ID cannot be empty.',
        },
      }
    }
  } else {
    endPoint = oppwaEndPointFormatter(body.mode, 'QUERY')
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
