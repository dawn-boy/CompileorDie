import ApiSupabase from '../apiSupabase.js'

async function updateRecord(tableName, idCol, idValue, updateValue) {
  return ApiSupabase.from(tableName)
    .update(updateValue)
    .eq(idCol, idValue)
    .select()
}

export default updateRecord
