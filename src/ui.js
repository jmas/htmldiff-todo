import * as diff from 'diffhtml';
import * as actions from './actions';
import store from './store';

const { html, innerHTML } = diff;

function onTaskChange (event) {
  event.preventDefault();
  store.dispatch(actions.done(parseInt(event.currentTarget.value, 10)));
}

function onTaskFormSubmit (event) {
  event.preventDefault();
  store.dispatch(actions.add({
    name: event.target.querySelector('input[name="name"]').value
  }));
}

export function createTask (task, index) {
  return html`
    <li>
      <label>
        <input type="checkbox" onclick="${onTaskChange}" value=${index} ${task.done ? 'checked': ''} />
        ${task.name} (${task.done ? 'Done': 'Not Done'})
      </label>
    </li>
  `;
}

export function createTasksList (tasks) {
  return html`
    <ul>
      ${tasks.map(createTask)}
    </ul>
  `;
}

export function createTaskForm () {
  return html`
    <form onsubmit="${onTaskFormSubmit}">
      <input type="text" name="name" />
      <input type="submit" />
    </form>
  `;
}

export function createToDo (tasks) {
  return html`
    <div class="todo-app">
      ${createTaskForm()}
      <hr />
      ${createTasksList(tasks)}
    </div>
  `;
}

export function renderToDo (el, tasks) {
  innerHTML(el, createToDo(tasks));
}
