function manageHeaders(req: Request, origin: string): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'authorization, content-type',
        'Access-Control-Allow-Max-Age': '86400',
      },
    })
  }

  const authHeader: string = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const response: { error: string } = {
      error: 'Missing or invalid authorization header',
    }
    return new Response(JSON.stringify(response), {
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'application/json',
      },
    })
  }

  return null
}

export default manageHeaders
