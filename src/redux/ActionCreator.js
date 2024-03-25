import { ADD_TASK, DELETE_TASK, EDIT_TASK, MARK_TASK_COMPLETE } from "./ActionConstants";


export const Add_task = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const Delete_task = (id) => {
  console.log(id);
  return {
    type: DELETE_TASK,
    payload: id,
  };
};

export const Mark_task = (id) => {
  console.log(id);
  return {
    type: MARK_TASK_COMPLETE,
    payload: id,
  };
};

export const Edit_task = (id,newTask) => {
  return {
    type: EDIT_TASK,
    payload: {id:id, task:newTask},
  };
};
