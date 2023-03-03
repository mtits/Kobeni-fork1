import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Get Transaction Results',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  try {
    // set the endpoint depending on the environment
    endPoint = oppwaEndPointFormatter(body.mode, 'GET_RESULTS', body.checkoutID)
  } catch (error) {
    const msg = 'Invalid Endpoint Format'
    logger.error(error, msg)

    return {
      kobeni: {
        error: msg,
        description: 'The reference ID cannot be empty.',
      },
    }
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
      },
    })

    // log to server before returning
    logger.info(
      {
        resource: body.checkoutID,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Query operation successful`
    )

    return response.data
  } catch (error) {
    logger.error(
      error.response.data,
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Query operation failed`
    )

    return error.response.data
  }
})
