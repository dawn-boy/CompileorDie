import ApiSupabase from '../apiSupabase.js'

async function getRecord(tableName, idCol, idValue) {
  return ApiSupabase.from(tableName).select('*').eq(idCol, idValue)
}

export default getRecord
