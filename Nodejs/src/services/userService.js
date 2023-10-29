import db from "../models/index";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user already exists

        let user = await db.User.findOne({
          attributes: ["email", "roleId", "passWord", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.passWord);

          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = "check successful"),
              delete user.passWord,
              (userData.user = user);
          } else {
            (userData.errCode = 3), (userData.errMessage = "wrong password");
          }
        }
      } else {
        // return error
        (userData.errCode = 1),
          (userData.errMessage = `your email isn't in your system. Please try again later`);
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId && userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["passWord"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = async (data) => {
  console.log("data received", data);
  let check = await checkUserEmail(data.email);
  if (check === true) {
    return {
      status: 400,
      message: "User already exists",
    };
  } else {
    let hashPassword = await bcrypt.hash(data.password, 10);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      image: data.avatar,
      roleId: data.roleId,
      positionId: data.positionId,
    });
    return {
      errCode: 0,
      message: "Create User successfully",
    };
  }
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: false,
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `The user isn't exist`,
      });
    }
    await user.destroy().then(function () {
      resolve({
        errCode: 0,
        message: `The user is deleted`,
      });
    });
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.email = data.email;
        user.password = data.password;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = user.gender;
        if (user.image) {
          user.image = data.avatar;
        }

        await user.save();
        resolve({
          errCode: 0,
          message: "update user successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: `user not found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCode = async (inputType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputType) {
        resolve({
          errCode: 1,
          errMessage: " Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: inputType },
        });
        res.errCode = 0;
        res.message = "get all code succseful";
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCode: getAllCode,
};
