import axios from 'axios'

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

    // log to server before returning
    console.log({
      requestData: {
        mode: body.mode,
        'authentication.partnerId': body.partnerID,
        'merchant.username': body.merchantUsername,
        'authentication.sKey': body.merchantSecureKey,
      },
      responseData: response.data,
    })

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    console.log({
      requestData: {
        mode: body.mode,
        'authentication.partnerId': body.partnerID,
        'merchant.username': body.merchantUsername,
        'authentication.sKey': body.merchantSecureKey,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
