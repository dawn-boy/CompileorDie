import getRecord from './getRecord.ts'

async function getTeamId(teamCode, origin) {
  const { data, error } = await getRecord('teams_table', 'team_code', teamCode)
  if (error || !data || data.length === 0) {
    return new Response(JSON.stringify({ error: 'JoinTeam not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })
  }
  if (!data[0]?.id) {
    return new Response(JSON.stringify({ error: 'TeamId not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })
  }

  return { status: true, data: data[0]?.id }
}

export default getTeamId
