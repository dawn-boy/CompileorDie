import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import manageHeaders from '../shared/helpers/manageHeaders.ts'
import shuffle from '../shared/helpers/shuffler.ts'
import getTeamId from '../shared/operations/getTeamId.ts'
import getPlayers from '../shared/operations/getPlayers.ts'
import updateRecord from '../shared/operations/updateRecord.ts'

serve(async (req: Request): Promise<Response> => {
  const origin: string = req.headers.get('origin') ?? '*'
  const managed: Response | null = manageHeaders(req, origin)
  if (managed) return managed

  const body = await req.json()
  const teamCode: string = body.teamCode
  if (!teamCode)
    return new Response(JSON.stringify({ error: 'Missing teamCode' }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })

  const roles: string[] = [
    'hacker',
    'debugger',
    'developerOne',
    'developerTwo',
    'cyberguardian',
  ]

  const shuffled: string[] = shuffle(roles)

  const { data: teamId } = await getTeamId(teamCode, origin)
  const { data: players } = await getPlayers(teamId, origin)

  for (const [index, { id }] of players.entries()) {
    await updateRecord(
      'players_table',
      'id',
      id,
      {
        role: shuff[index],
      },
      origin
    )
  }

  return new Response(JSON.stringify({ success: 'Roles assigned' }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': origin,
    },
  })
})
