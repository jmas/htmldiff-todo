import { renderToDo } from './ui';
import { store, getTasksFiltered } from './store';
import * as actions from './actions';

function render () {
  renderToDo(document.getElementById('root'), store.getState());
}

function save () {
  localStorage.setItem('todo_state', JSON.stringify(store.getState()));
}

function load () {
  return new Promise((resolve, reject) => {
    let state = localStorage.getItem('todo_state');
    if (state) {
      resolve(JSON.parse(state));
    }
  })
}

store.subscribe(() => render());
store.subscribe(() => save());
render();
load().then((state) => store.dispatch(actions.load(state)));
