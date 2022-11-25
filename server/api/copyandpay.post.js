import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log({
    requestEndpoint: body.endPoint,
    accessToken: body.accessToken,
    data: body.dataParameters,
  })

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
    console.log(response.data)
    return response.data

    // error
  } catch (error) {
    // log to server before returning
    console.log(error.response.data)
    return error.response.data
  }
})
