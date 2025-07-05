import { SupabaseResponse } from '../helpers/SupabaseResponse.ts'
import supabase from '../supabase.ts'

async function getRecord(
  tableName: string,
  colId: string,
  colVal: string
): Promise<SupabaseResponse<T>> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(colId, colVal)
  return { data, error }
}

export default getRecord
