import ApiSupabase from '../apiSupabase.js'

async function updateTable(tableName, idCol, idValue, updateValue) {
  await ApiSupabase.from(tableName).update(updateValue).eq(idCol, idValue)
}

export default updateTable
