import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("http://localhost:8080/api/login", {
    email: userEmail,
    password: userPassword,
  });
};
// input = All => lấy tất cả người dùng
// output = id => lấy 1 ng dùng
const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
const createNewUserService = (data) => {
  console.log("data", data);
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/update-user", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/get-allcode?type=${inputType}`);
};
const getUserDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getUserDoctorService,
};
