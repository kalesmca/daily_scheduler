import * as types from "../types";

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };

    case types.FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case types.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? action.payload
            : task
        )
      };

    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        )
      };

    default:
      return state;
  }
};

export default taskReducer;