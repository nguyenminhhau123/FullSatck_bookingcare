import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUsersRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsersRedux !== this.props.listUsersRedux) {
      // let userRedux = this.props.listUsersRedux;
      this.setState({ userRedux: this.props.listUsersRedux });
    }
  }
  // edit user
  handleEditUser = (user) => {
    console.log("user user edit", user);
    this.props.handleEditUserFromParentKey(user);
  };
  // delete
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };
  render() {
    // console.log("list state user", this.props.listUsersRedux);
    // console.log("all users", this.props.listUsersRedux);
    let userRedux = this.props.listUsersRedux;
    return (
      <>
        <table id="tableManage">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {userRedux &&
              userRedux.length > 0 &&
              userRedux.map((items, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{items.email}</td>
                      <td>{items.firstName}</td>
                      <td>{items.lastName}</td>
                      <td>{items.address}</td>
                      <td>
                        <button
                          onClick={() => {
                            this.handleEditUser(items);
                          }}
                        >
                          <i className="fas fa-pencil-alt icon-pencil"></i>
                        </button>
                        <button
                          onClick={() => {
                            this.handleDeleteUser(items);
                          }}
                        >
                          <i className="fas fa-trash icon-trash1"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: (data) => dispatch(actions.fetchAllUsersStart(data)),
    deleteUserRedux: (id) => dispatch(actions.deleteUsersStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
