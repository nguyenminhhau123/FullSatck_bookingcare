import bcrypt from "bcryptjs";
import db from "../models/index";
let salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFormBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        passWord: hashPasswordFormBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        // gender: data.gender,
        // roleId: data.roleId,
        // positionId: data.positionId,
      });
      resolve("ok create a new user success");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let usersData = await db.User.findAll({
        raw: true,
      });
      resolve(usersData);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let UpdateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let DeleteUserDataById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.findOne({
        where: { id: id },
      });
      userDelete.destroy();
      let data = await db.User.findAll();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  UpdateUserData: UpdateUserData,
  DeleteUserDataById: DeleteUserDataById,
};
