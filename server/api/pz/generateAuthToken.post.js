import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Generate Auth Token',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'preprod' : 'secure'
  const endPoint = `https://${subDomain}.prtpg.com/transactionServices/REST/v1/authToken`

  try {
    const response = await axios({
      method: 'post',
      url: endPoint,
      data: `authentication.partnerId=${body.partnerID}&merchant.username=${body.merchantUsername}&authentication.sKey=${body.merchantSecureKey}`,
    })

    /**
     * due to PZ being stupid regarding the returned HTTP code, regardless of results, they will always return 200 here, why??
     */
    logger.info(
      {
        requestData: {
          'authentication.partnerId': body.partnerID,
          'merchant.username': body.merchantUsername,
        },
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Auth token generated successfully`
    )

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: {
          'authentication.partnerId': body.partnerID,
          'merchant.username': body.merchantUsername,
        },
        responseErrorData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Failed to generate checkout ID`
    )

    return error.response.data
  }
})
