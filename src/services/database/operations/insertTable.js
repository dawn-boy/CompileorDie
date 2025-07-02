import ApiSupabase from '../apiSupabase.js'

async function insertTable(tableName, insertValue) {
  return ApiSupabase.from(tableName).insert([insertValue]).select()
}

export default insertTable
