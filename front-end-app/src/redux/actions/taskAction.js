import * as types from "../types";
import {getAllTasks, saveTask, updateTaskById, deleteTaskById} from "../services/taskService";

// FETCH ALL TASKS
export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_TASKS_REQUEST });

    try {
      const data = await getAllTasks();

      dispatch({
        type: types.FETCH_TASKS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_TASKS_FAILURE,
        payload: error.response?.data?.message || error.message
      });
    }
  };
};

// CREATE TASK
export const createTask = (task) => {
  return async (dispatch) => {
    try {
      const data = await saveTask(task);

      dispatch({
        type: types.CREATE_TASK_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
};

// UPDATE TASK
export const updateTask = (task) => {
  return async (dispatch) => {
    try {
      const data = await updateTaskById(task);

      dispatch({
        type: types.UPDATE_TASK_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
};

// DELETE TASK
export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      await deleteTaskById(id);

      dispatch({
        type: types.DELETE_TASK_SUCCESS,
        payload: id
      });
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };
};