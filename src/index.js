import { renderToDo } from './ui';
import store from './store';

function render () {
  renderToDo(document.getElementById('root'), store.getState());
}

store.subscribe(() => render());
render();
