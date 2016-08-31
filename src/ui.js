import * as diff from 'diffhtml';
import * as actions from './actions';
import { store, FILTER_ALL, FILTER_DONE, FILTER_UNDONE } from './store';

const filters = {
  [FILTER_ALL]: 'All',
  [FILTER_DONE]: 'Done',
  [FILTER_UNDONE]: 'Undone'
};

const { html, innerHTML } = diff;

function onTaskChange (event) {
  store.dispatch(actions.done(parseInt(event.currentTarget.value, 10), event.currentTarget.checked));
}

function onTaskFormSubmit (event) {
  event.preventDefault();
  let nameEl = event.target.querySelector('input[name="name"]');
  if (! nameEl.value) {
    alert('Enter a task name!');
    return;
  }
  store.dispatch(actions.add({
    name: nameEl.value,
    done: false
  }));
  nameEl.value = '';
}

function onTaskRemove (event) {
  event.preventDefault();
  store.dispatch(actions.remove(parseInt(event.currentTarget.getAttribute('data-index'), 10)));
}

function onFilterClick (event) {
  event.preventDefault();
  store.dispatch(actions.filter(event.currentTarget.value));
}

function getTasksFiltered (tasks, filterBy) {
  switch (filterBy) {
    case FILTER_DONE:
      return tasks.filter((task) => task.done);
    case FILTER_UNDONE:
      return tasks.filter((task) => !task.done);
  }
  return tasks;
}

export function createTask (task, index) {
  return html`
    <li>
      <label>
        <input type="checkbox" onclick="${onTaskChange}" value=${index} ${task.done ? 'checked': ''} />
        ${task.name}
        <button onclick="${onTaskRemove}" data-index=${index}>Remove</button>
      </label>
    </li>
  `;
}

export function createTasksList (tasks) {
  return html`
    <form>
      <ul>
        ${tasks.map(createTask)}
      </ul>
    </form>
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

export function createToDo (state) {
  return html`
    <div class="todo-app">
      ${createTaskForm()}
      <hr />
      ${createFilter(state.filterBy)}
      <hr />
      ${createTasksList(getTasksFiltered(state.tasks, state.filterBy))}
    </div>
  `;
}

export function createFilterOption (type, filterBy) {
  return html`
    <label>
      <input type="radio" name="filterBy" onclick="${onFilterClick}" value="${type}" ${filterBy===type ? 'checked': ''} /> ${filters[type]}
    </label>
  `;
}

export function createFilter (filterBy) {
  return html`
    <form>
      <span>Filter by:</span>
      ${Object.keys(filters).map((type)=>createFilterOption(type, filterBy))}
    </form>
  `;
}

export function renderToDo (el, state) {
  innerHTML(el, createToDo(state));
}
