import getAllRecords from './getAllRecords.ts'

async function getPlayers(teamId, origin) {
  const { data, error } = await getAllRecords(
    'players_table',
    'team_id',
    teamId
  )
  if (error || !data || data.length === 0) {
    return new Response(JSON.stringify({ error: 'No players found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })
  }
  if (data.length !== 5) {
    return new Response(JSON.stringify({ error: 'Not Enough players found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })
  }

  return { status: true, data: data }
}

export default getPlayers
