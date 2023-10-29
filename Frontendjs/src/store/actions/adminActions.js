import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getUserDoctorService,
} from "../../services/userService";
// start doing end
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

/// position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
// CREATE USER
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(SaveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(SaveUserFailed());
      }
    } catch (error) {
      dispatch(SaveUserFailed());
      console.log("saveUserFailed error", error);
    }
  };
};
export const SaveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});
export const SaveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED,
});

// get all users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      // let res1 = await getUserDoctorService(3);
      // console.log("check data doctor service res1", res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      console.log("fetchAllUsersFailed", error);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});
// delete user redux
export const deleteUsersStart = (inputId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(inputId);
      if (res && res.errCode === 0) {
        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUsersStart());
        toast.success(res.message);
      } else {
        dispatch(deleteUsersFailed());
        toast.error("delete unsuccessful!");
      }
    } catch (error) {
      console.log("fetchAllUsersFailed", error);
    }
  };
};
export const deleteUsersSuccess = (data) => ({
  type: actionTypes.DELETE_USERS_SUCCESS,
});
export const deleteUsersFailed = () => ({
  type: actionTypes.DELETE_USERS_FAILED,
});
// edit user
export const editUser = (data) => {
  console.log("data from user redux:", data);

  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      // console.log("check create data user redux", res);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUserFailed());
        toast.warning(res.message);
      }
    } catch (error) {
      dispatch(editUserFailed());
      console.log("saveUserFailed error", error);
    }
  };
};
export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
export const getUserDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getUserDoctorService("10");
      // // let res1 = await getUserDoctorService(3);
      // console.log("check data doctor service res11", res);
      if (res && res.errCode === 0) {
        dispatch(getUserDoctorSuccess(res));
      } else {
        dispatch(getUserDoctorFailed());
      }
    } catch (error) {
      console.log("getUserDoctorFailed", error);
    }
  };
};
export const getUserDoctorSuccess = (res) => ({
  type: actionTypes.FETCH_USER_DOCTOR_SUCCESS,
  data: res,
});
export const getUserDoctorFailed = () => ({
  type: actionTypes.FETCH_USER_DOCTOR_FAILED,
});
