import axios from 'axios'
import pino from 'pino'
import { oppwaEndPointFormatter } from '../../../utils/stringFormatters'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Schindlers List',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  try {
    // set the endpoint depending on the environment
    endPoint = oppwaEndPointFormatter(body.mode, 'LIST')

    //
  } catch (error) {
    const msg = 'Invalid Endpoint'
    logger.error(error, msg)

    return {
      kobeni: { error: msg, description: 'Unable to parse URL endpoint.' },
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
        'date.from': `${body.dateFrom} 00:00:00`,
        'date.to': `${body.dateTo} 23:59:59`,
        paymentTypes: body.paymentTypes,
      },
    })

    logger.info(response.data)
    return response.data

    //
  } catch (error) {
    logger.error((error as any).response.data)
    return (error as any).response.data
  }
})
