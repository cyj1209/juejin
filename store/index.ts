import {
  GET_GOLD_LIST,
  Gold,
  IndexReducer,
  CHANGE_GOLD_LIST,
  GitHub,
  GET_GIT_HUB,
  CHANGE_GIT_HUB
} from "../type";
import * as redux from "redux";

export const addGoldList = (list: Gold[]) => ({
  type: GET_GOLD_LIST,
  list
});

export const changeGoldList = (list: Gold[]) => ({
  type: CHANGE_GOLD_LIST,
  list
});

export const addGitHubList = (list: GitHub[]) => ({
  type: GET_GIT_HUB,
  list
});

export const changeGitHubList = (list: GitHub[]) => ({
  type: CHANGE_GIT_HUB,
  list
});

const defaultState: IndexReducer = {
  leftList: [],
  rightList: []
};
const indexReducer: redux.Reducer = (
  state: IndexReducer = defaultState,
  action
) => {
  switch (action.type) {
    case GET_GOLD_LIST:
      return {
        ...state,
        leftList: [...state.leftList, ...action.list]
      };
    case CHANGE_GOLD_LIST:
      return {
        ...state,
        leftList: action.list
      };
    case GET_GIT_HUB:
      return {
        ...state,
        rightList: [...state.rightList, ...action.list]
      };
    case CHANGE_GIT_HUB:
      return {
        ...state,
        rightList: action.list
      };
    default:
      return state;
  }
};

export default indexReducer;
