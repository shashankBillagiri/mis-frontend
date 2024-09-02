// config.js
const API_BASE_URL = 'http://localhost:8191/v1/mis'; // Base URL for your APIs

export default {
    GET_ALL_STUDENTS: `${API_BASE_URL}/getallstudentdetails`,
    DELETE_STUDENTS: `${API_BASE_URL}/deletetudentsbystudentids`,
    ADD_STUDENTS: `${API_BASE_URL}/newstudents`
};
