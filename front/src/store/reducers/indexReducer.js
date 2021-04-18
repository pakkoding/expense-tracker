import { SET_GROUP_STATEMENT_LIST } from '../constants'

const initialState = {
  statementGroupList: []
}

export const indexReducer = (state = initialState, action) => {
  if (action.type === SET_GROUP_STATEMENT_LIST) {
    return {
      ...state,
      statementGroupList: action.statementGroupList
    }
  }
  return state
}
