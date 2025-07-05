import getAccessToken from '../../users/getAccessToken.js'

async function postRequest(action, body) {
  const userAccessToken = await getAccessToken()
  const response = await fetch(
    `https://ezuhxsnsnsrqrnknrrqz.supabase.co/functions/v1/${action}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  const data = await response.json()
  return data
}

export default postRequest
