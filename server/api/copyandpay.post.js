import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const response = await axios({
      method: 'post',
      url: body.endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      data: body.dataParameters,
    })

    // log to server before returning
    console.log({
      requestData: {
        requestEndpoint: body.endPoint,
        accessToken: body.accessToken,
        data: body.dataParameters,
      },
      responseData: response.data,
    })

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    console.log({
      requestData: {
        requestEndpoint: body.endPoint,
        accessToken: body.accessToken,
        data: body.dataParameters,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
