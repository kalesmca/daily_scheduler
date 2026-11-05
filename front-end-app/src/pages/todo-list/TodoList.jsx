import React, { useMemo, useState, useEffect } from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from "../../redux/actions/taskAction";

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function TodoList() {
  // const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState("view");

const dispatch = useDispatch();

const { tasks, loading, error } = useSelector(
  (state) => state.task
);

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

const emptyTask = {
  title: "",
  description: "",
  scheduledDate: "",
  startTime: "",
  endTime: "",
  priority: "MEDIUM",
  status: "PENDING"
};

const openCreateTask = () => {
  setFormData({ ...emptyTask });
  setSelectedTask(null);
  setModalMode("create");
  setIsModalOpen(true);
  setIsEditing(true)
};

const openTaskDetails = (task) => {
  setSelectedTask(task);
  setFormData({ ...task });
  setModalMode("view");
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedTask(null);
};

  

  const closeTaskDetails = () => {
    setSelectedTask(null);
    setIsEditing(false);
    setIsModalOpen(false)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();

    // setTasks((prev) =>
    //   prev.map((task) => (task.id === formData.id ? { ...formData } : task)),
    // );

    closeTaskDetails();
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const handleDelete = (id) => {
    // if (window.confirm("Are you sure you want to delete this task?")) {
    //   setTasks((prev) => prev.filter((task) => task.id !== id));
    // }
    dispatch(deleteTask(id))
  };

  const handleStatusChange = (id, status) => {
    // setTasks((prev) =>
    //   prev.map((task) => (task.id === id ? { ...task, status } : task)),
    // );
  };

  const saveTask = () =>{
    formData?.id? dispatch(updateTask(formData)) : dispatch(createTask(formData));
    setIsModalOpen(false);
    setFormData({ ...emptyTask });

  }

  return (
    <div className="task-page">
      <div className="task-header">
        <div>
          <h2>My Tasks</h2>
          <p>Manage and track your daily activities</p>
        </div>

        <button className="add-task-btn" onClick={()=> {openCreateTask()}}>+ Create Task</button>
      </div>

      <div className="task-stats">
        <div className="stat-card">
          <span>Total Tasks</span>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <h2>{tasks.filter((t) => t.status === "PENDING").length}</h2>
        </div>

        <div className="stat-card">
          <span>In Progress</span>
          <h2>{tasks.filter((t) => t.status === "IN_PROGRESS").length}</h2>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <h2>{tasks.filter((t) => t.status === "COMPLETED").length}</h2>
        </div>
      </div>

      <div className="task-container">
        <div className="task-toolbar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Details</th>
                <th>Scheduled Date</th>
                <th>Time</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <div className="task-title">{task.title}</div>
                      <div className="task-description">{task.description}</div>
                    </td>

                    <td>{formatDate(task.scheduledDate)}</td>

                    <td>
                      <div className="time-value">
                        {formatTime(task.startTime)}
                      </div>
                      <div className="time-end">
                        to {formatTime(task.endTime)}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`priority-badge ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`status-select ${task.status.toLowerCase()}`}
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                      >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => openTaskDetails(task)}
                        >
                          View
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() => {
                            openTaskDetails(task);
                            setIsEditing(true);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </div>



{isModalOpen && (
  <div className="modal-overlay" onClick={closeTaskDetails}>
    <div
      className="task-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <div>
          <h2>{isEditing ? "Edit Task" : "Task Details"}</h2>
          <p>View and manage your task information</p>
        </div>

        <button
          className="modal-close"
          onClick={closeTaskDetails}
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleUpdateTask}>
        <div className="modal-body">

          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date</label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority || "MEDIUM"}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status || "PENDING"}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

                <strong>#{selectedTask?.id}</strong>
          {!isEditing && selectedTask && (
            <div className="task-meta">
              <div>
                <span>Task ID</span>
                <strong>#{selectedTask?.id}</strong>
              </div>
              <div>
                <span>Created At</span>
                <strong>
                  {new Date(selectedTask?.createdAt)?.toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Last Updated</span>
                <strong>
                  {new Date(selectedTask?.updatedAt)?.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          )}

        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="cancel-btn"
            onClick={closeTaskDetails}
          >
            Cancel
          </button>

          {!isEditing ? (
            <button
              type="button"
              className="save-btn"
              onClick={() => setIsEditing(true)}
            >
              <span>✎</span> Edit Task
            </button>
          ) : (
            <button type="submit" className="save-btn" onClick={()=> {saveTask()}}>
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
