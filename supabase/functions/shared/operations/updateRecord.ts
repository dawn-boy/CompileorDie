import { SupabaseResponse } from '../helpers/SupabaseResponse.ts'
import supabase from '../supabase.ts'

async function updateRecord(
  tableName: string,
  colId: string,
  colVal: string,
  updateVal,
  origin
): Promise<SupabaseResponse<T>> {
  const { data, error } = await supabase
    .from(tableName)
    .update(updateVal)
    .eq(colId, colVal)
    .select()

  if (error || !data || data.length === 0)
    return new Response(JSON.stringify({ error: 'update not successfull' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    })

  return { data, error }
}

export default updateRecord
