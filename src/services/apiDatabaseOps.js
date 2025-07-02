import ApiSupabase from './apiSupabase.js'
import { check } from '../helpers/check.js'

async function updateTable(tableName, idCol, idValue, updateValue) {
  await ApiSupabase.from(tableName).update(updateValue).eq(idCol, idValue)
}
async function insertTable(tableName, insertValue) {
  return ApiSupabase.from(tableName).insert([insertValue]).select()
}
async function getRecord(tableName, idCol, idValue) {
  return ApiSupabase.from(tableName).select('*').eq(idCol, idValue)
}
async function checkRecord(tableName, idCol = '', idValue) {
  const { data, error } = await getRecord(tableName, idCol, idValue)
  if (error) {
    return { isFound: false, data: null }
  }
  return { isFound: check(data, idCol, idValue), data: data[0] }
}

export { updateTable, insertTable, checkRecord, getRecord }
