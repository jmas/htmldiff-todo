import { createStore } from 'redux';
import * as actions from './actions';

function todos(state = [], action) {
  console.log('action', action);
  switch (action.type) {
    case actions.ADD_TASK:
      return state.concat([ action.task ])
    case actions.DONE_TASK:
      return state.map((item, index) => {
        if (index === action.index) {
          item.done = !item.done;
        }
        return item;
      });
    default:
      return state
  }
}

export default createStore(todos, [ {name: 'Use Redux'} ]);
