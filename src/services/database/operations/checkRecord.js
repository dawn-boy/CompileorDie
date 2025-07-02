import { check } from '../../../helpers/check.js'
import getRecord from './getRecord.js'

async function checkRecord(tableName, idCol = '', idValue) {
  const { data, error } = await getRecord(tableName, idCol, idValue)
  if (error) {
    return { isFound: false, data: null }
  }
  return { isFound: check(data, idCol, idValue), data: data[0] }
}

export default checkRecord
