import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Server-to-Server',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let endPoint = ''

  // set the endpoint depending on the environment
  try {
    endPoint = oppwaEndPointFormatter(body.mode, 'S2S')
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

    // log to server before returning
    logger.info(
      {
        requestData: body.dataParameters,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Server-to-server operation successful`
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
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Server-to-server operation failed`
    )

    return error.response.data
  }
})
