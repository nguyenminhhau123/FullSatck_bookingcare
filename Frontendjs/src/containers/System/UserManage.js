import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
        isOpenModalUser: false,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };
  toggleEditUserModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };

  createNewUser = async (data) => {
    console.log("data create new user", data);
    try {
      let response = await createNewUserService(data);
      console.log("data response", response);
      if (response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
      // fire event
      emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
    } catch (error) {
      console.log(error);
    }

    console.log("data modal", data);
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      console.log("data delete user:", res);
      if (res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // edit user
  handleEditUser = async (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
        await this.getAllUsersFromReact();
      } else {
        console.log(res.errMessage);
      }
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };
  /* life cycle
   *1 Run component -> init state
   *2 Did mount (set state)
   *3 render
   *
   *
   */
  //
  render() {
    let arrUsers = this.state.arrUsers;
    // properties
    return (
      <>
        <div className="user-container">
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenModalEditUser === true && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              toggleFromParent={this.toggleEditUserModal}
              currentUser={this.state.userEdit}
              editUser={this.doEditUser}
            />
          )}
          <div className="title text-center">Manage users with IT</div>
          <div className="mx-2">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus"></i>add new user
            </button>
          </div>
          <div className="users-table mt-3 mx-2">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>

                {arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button>
                          <i
                            className="fas fa-pencil-alt icon-pencil"
                            onClick={() => this.handleEditUser(item)}
                          ></i>
                        </button>
                        <button>
                          <i
                            className="fas fa-trash icon-trash1"
                            onClick={() => this.handleDeleteUser(item)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
