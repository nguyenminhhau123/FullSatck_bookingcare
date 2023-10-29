import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from "../../assets/images/user.svg";
import passIcon from "../../assets/images/pass.svg";
import "./login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  // constructor là hàm tạo
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    // trước khi login
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.errMessage });
      }
      if (data && data.errCode === 0) {
        //todo:
        this.props.userLoginSuccess(data.user);
        console.log("login success!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-center title-login">Login</div>
              <div className="col-12 from-group input-login">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={this.state.username}
                  onChange={(event) => this.handleOnchangeUsername(event)}
                />
              </div>
              <div className="col-12 from-group input-login">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control "
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangePassword(event)}
                  />
                  <span
                    onClick={() => {
                      this.handleShowHidePassword();
                    }}
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? "far fa-eye icon-display-password"
                          : "fas fa-eye-slash icon-display-password"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12 text-center mt-3">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>

              <div className="col-12">
                <span className="span-forgot-pw">Forgot your password?</span>
              </div>
              <div className="col-12 text-center">
                {" "}
                <span className="text-other-login mt-3">Or login with:</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-google-plus-g icon-google"></i>
                <i className="fab fa-facebook-f icon-fb"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
