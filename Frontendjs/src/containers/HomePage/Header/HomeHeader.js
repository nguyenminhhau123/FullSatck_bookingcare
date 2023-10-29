import React, { Component } from "react";

import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../../assets/bookingcare-2020.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions/appActions.js";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event : actions
  };
  render() {
    let language = this.props.language;
    console.log("check language", language);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo} />
              {/* <div className="header-logo"></div> */}
            </div>
            <div className="center-content">
              <div className="child-content">
                <strong>
                  <FormattedMessage id="homeheader.specially" />
                </strong>
                <div>
                  {" "}
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <strong>
                  {" "}
                  <FormattedMessage id="homeheader.health-facility" />
                </strong>
                <div>
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <strong>
                  <FormattedMessage id="homeheader.doctor" />
                </strong>
                <div>
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <strong>
                  <FormattedMessage id="homeheader.fee" />
                </strong>
                <div>
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              {/* "language-vi active" */}
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="banner-title">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2  ">
                <FormattedMessage id="banner.title2" />
              </div>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input placeholder="Tìm chuyên khoa khám bệnh" type="text" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.specialist-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Remote-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.General-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-flask"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Medical-test" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Mental-health" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-briefcase-medical"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Dental-examination" />
                </div>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject redux như 1 cái bộ nhớ
    // giá trị language đc lưu trong redux muốn sử dụng thì mapStateToProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
