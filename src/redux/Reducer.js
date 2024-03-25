import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  MARK_TASK_COMPLETE,
} from "./ActionConstants";
let lastId = 0;

const initialState = {
  tasks: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const task = {
        id: ++lastId,
        task: action.payload,
        status: false,
      };
      return { tasks: [...state.tasks, task] };
    case DELETE_TASK:
      const updatedState = state.tasks.filter(
        (taskId) => taskId.id !== action.payload
      );
      return { tasks: updatedState };
    case MARK_TASK_COMPLETE:
      const markTask = state.tasks.findIndex(
        (taskId) => taskId.id === action.payload
      );
      state.tasks[markTask].status = true;

      return { tasks: [...state.tasks] };
    case EDIT_TASK:
      const updateTask = state.tasks.findIndex(
        (taskId) => taskId.id === action.payload.id
      );
      state.tasks[updateTask].task = action.payload.task;
      return { tasks: [...state.tasks] };
    default:
      return state;
  }
};

export default Reducer;
