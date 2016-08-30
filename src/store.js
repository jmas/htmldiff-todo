import { createStore } from 'redux';
import * as actions from './actions';

export const FILTER_ALL = 'all';
export const FILTER_DONE = 'done';
export const FILTER_UNDONE = 'undone';

let defaultState = {
  tasks: [ {name: 'Use Redux'} ],
  filterBy: FILTER_ALL
};

export let store = createStore((state = [], action) => {
  console.log(action);
  switch (action.type) {
    case actions.LOAD:
      return action.state;
    case actions.ADD_TASK:
      state.tasks = state.tasks.concat([ action.task ]);
      return state;
    case actions.DONE_TASK:
      state.tasks = state.tasks.map((item, index) => {
        if (index === action.index) {
          item.done = action.state;
        }
        return item;
      });
      return state;
    case actions.REMOVE_TASK:
      state.tasks = state.tasks.filter((item, index) => {
        return index !== action.index;
      });
      return state;
    case actions.FILTER:
      state.filterBy = action.by;
      return state;
    default:
      return state;
  }
}, defaultState);

