export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const DONE_TASK = 'DONE_TASK';
export const LOAD = 'LOAD';
export const FILTER = 'FILTER';

export function load (state) {
  return {
    type: LOAD,
    state
  };
}

export function add (task) {
  return {
    type: ADD_TASK,
    task
  };
}

export function remove (index) {
  return {
    type: REMOVE_TASK,
    index
  };
}

export function done (index, state) {
  return {
    type: DONE_TASK,
    index,
    state
  };
}

export function filter (by) {
  return {
    type: FILTER,
    by
  };
}
