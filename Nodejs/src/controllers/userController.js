import { query } from "express";
import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let dataUser = await userService.handleUserLogin(email, password);
  // check email exists
  // compare password (email người dùng kh có trong hệ thống)
  // return userInfor
  // return acces_token: JWT token (JSON - WED - TOKEN)
  console.log(dataUser);
  return res.status(200).json({
    errCode: dataUser.errCode,
    errMessage: dataUser.errMessage,
    user: dataUser.user ? dataUser.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  // param
  let id = req.query.id;
  let users = await userService.getAllUsers(id);
  console.log("users", users);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log("data3333", req.body);
  // console.log(message);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  } else {
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
  }
};
let handleUpdateUser = async (req, res) => {
  let message = await userService.updateUser(req.body);
  return res.status(200).json(message);
};

let handleGetAllCode = (req, res) => {
  try {
    setTimeout(async () => {
      let data = await userService.getAllCode(req.query.type);
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(200).json({
      error: -1,
      errorMessage: "Error from sever",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleUpdateUser: handleUpdateUser,
  handleGetAllCode: handleGetAllCode,
};
