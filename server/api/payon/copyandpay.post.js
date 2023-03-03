import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - CopyAndPay',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  try {
    // set the endpoint depending on the environment
    endPoint = oppwaEndPointFormatter(body.mode, 'COPYANDPAY')
  } catch (error) {
    const msg = 'Invalid Endpoint'
    logger.error(error, msg)

    return {
      kobeni: { error: msg, description: 'Unable to parse URL endpoint.' },
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

    // log to server
    logger.info(
      {
        requestData: body.dataParameters,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Checkout ID generated successfully`
    )

    return response.data
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: body.dataParameters,
        responseErrorData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Failed to generate checkout ID`
    )

    return error.response.data
  }
})
