import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Fetch Transactions List',
})

export default defineEventHandler(async (event) => {
  //
  const accessToken = getHeader(event, 'accessToken')
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'preprod' : 'secure'
  const endPoint = `https://${subDomain}.prtpg.com/transactionServices/REST/v1/getTransactionList`

  const data = `authentication.memberId=${body.memberID}&authentication.checksum=${body.checksum}&pagination.fromdate=${body.from}&pagination.todate=${body.to}`

  try {
    const response = await axios({
      headers: { AuthToken: accessToken },
      method: 'post',
      url: endPoint,
      data: data,
    })

    logger.info(
      {
        requestData: data,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Fetch Transaction List`
    )

    return response.data
  } catch (error) {
    logger.error(
      {
        requestData: data,
        responseErrorData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Failed to Fetch Transaction List`
    )

    return error.response.data
  }
})
