import { SET_GROUP_STATEMENT_LIST } from '../constants'

export const setGroupStatementList = (list) => async dispatch => {
  return dispatch({
    type: SET_GROUP_STATEMENT_LIST,
    statementGroupList: list
  })
}
