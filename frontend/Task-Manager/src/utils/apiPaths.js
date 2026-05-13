export const BASE_URL = "http://localhost:8000";

// utils/apiPath.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user (Admin or Member)
    LOGIN: "/api/auth/login", //Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", //Get logged-in user details
  },

  USERS: {
    GET_ALL_USERS: "/api/users", //Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user by id
    CREATE_USER: "/api/users", //create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, //update user details 
    DELETE_USER: (userId) => `/api/users/${userId}`, //delete user     
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //Get dashboard data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //Get User dashboard data
    GET_ALL_TASKS: "/api/tasks", //Get all tasks (Admin: all, user: only assigned)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //Get task by ID
    CREATE_TASK: "/api/tasks", //Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //Update task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //Delete a task (Admin only)

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //Update task status (Admin or Assignee)
    UPDATE_TASK_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, //Update task checklist (Admin or Assignee)
  },

  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", //Download all tasks as an Excel file (Admin only)
    EXPORT_USERS: "/api/reports/export/users", //Download user-task report

  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", //Upload user profile image
  },

};