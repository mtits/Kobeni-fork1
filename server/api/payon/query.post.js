import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let subDomain = ''
  let endPoint = ''
  let merchantTransactionId = undefined // axios note: params that are null or undefined are not rendered in the URL.

  // set the endpoint depending on the environment
  if (body.mode == 'Test') {
    subDomain = `eu-test`
  } else {
    subDomain = `eu-prod`
  }

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
    console.log({
      requestData: {
        endPoint: endPoint,
        referenceId: body.referenceId,
        merchantTransactionId: merchantTransactionId,
        mode: body.mode,
        accessToken: body.accessToken,
      },
      responseData: response.data,
    })

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    console.log({
      requestData: {
        endPoint: endPoint,
        referenceId: body.referenceId,
        merchantTransactionId: merchantTransactionId,
        mode: body.mode,
        accessToken: body.accessToken,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
