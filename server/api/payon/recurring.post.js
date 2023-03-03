import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Recurring Transactions',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  // set the endpoint depending on the environment
  try {
    endPoint = oppwaEndPointFormatter(
      body.mode,
      'RECURRING',
      body.registrationId
    )
  } catch (error) {
    const msg = 'Invalid Endpoint Format'
    logger.error(error, msg)

    return {
      kobeni: {
        error: msg,
        description: 'The registration ID cannot be empty.',
      },
    }
  }

  try {
    const response = await axios({
      method: 'post',
      url: endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      data: body.dataParameters,
    })

    // log to server before returning
    logger.info(
      {
        requestData: body.dataParameters,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Recurring operation successful`
    )

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: body.dataParameters,
        responseData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Recurring operation failed`
    )

    return error.response.data
  }
})
