import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { isEmailValid, isPasswordValid } from "../../Validation/ValidateUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgUrl: "",
      isOpen: false,

      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({ genderArr: res.data });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   let res = await getAllCodeService("role");
    //   if (res && res.errCode === 0) {
    //     this.setState({ roleArr: res.data });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   let res = await getAllCodeService("position");
    //   if (res && res.errCode === 0) {
    //     this.setState({ positionArr: res.data });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUsersRedux !== this.props.listUsersRedux) {
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        previewImgUrl: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  //
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check file coverFAILE:", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({ previewImgUrl: objectUrl, avatar: base64 });
    }
  };
  openPreviewImage = () => {
    if (this.state.previewImgUrl === "") {
      return;
    }
    this.setState({ isOpen: true });
  };
  // check bying action

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let action = this.state.action;
    // fire redux action
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let valueCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];

    for (let i = 0; i < valueCheck.length; i++) {
      if (!this.state[valueCheck[i]]) {
        isValid = false;
        alert("Missing required parameters: " + valueCheck[i]);
        break;
      }
      // else if (valueCheck[i] === "password") {
      //   if (!isPasswordValid(this.state[valueCheck[i]])) {
      //     isValid = false;
      //     alert("Password must have at least one alphanumeric character");
      //     break;
      //   }
      // }
      else if (valueCheck[i] === "email") {
        if (!isEmailValid(this.state[valueCheck[i]])) {
          isValid = false;
          alert("Enter email in incorrect format");
          break;
        }
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state }; // copy state
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "code",
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: user.avatar,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
      previewImgUrl: imageBase64,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGenders = this.props.isLoadingGenders;
    let {
      email,
      password,
      lastName,
      firstName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    // console.log("check role genderRedux position data", this.state);
    return (
      <>
        <div className="user-redux-container">
          <div className="title">USER REDUX MINH HAU IT</div>

          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {isLoadingGenders === true ? "Loading data..." : ""}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <FormattedMessage id="manager-user.add" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className="col-9">
                  <label>
                    {" "}
                    <FormattedMessage id="manager-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((items, index) => {
                        return (
                          <>
                            <option key={index} value={items.keyMap}>
                              {language === LANGUAGES.VI
                                ? items.valueVI
                                : items.valueEN}
                            </option>
                            ;
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    {" "}
                    <FormattedMessage id="manager-user.role" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((items, index) => {
                        return (
                          <>
                            <option id={index} value={items.keyMap}>
                              {language === LANGUAGES.VI
                                ? items.valueVI
                                : items.valueEN}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.position" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((items, index) => {
                        return (
                          <>
                            <option id={index} value={items.keyMap}>
                              {language === LANGUAGES.VI
                                ? items.valueVI
                                : items.valueEN}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manager-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => {
                        this.handleOnChangeImage(event);
                      }}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
                <div className="col-12 ">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning color-text"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manager-user.edit" />
                    ) : (
                      <FormattedMessage id="manager-user.save" />
                    )}
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TableManageUser
                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                    // action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsersRedux: state.admin.users,
    isLoadingGenders: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);