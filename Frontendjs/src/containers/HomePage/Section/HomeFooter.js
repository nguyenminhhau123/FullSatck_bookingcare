import React, { Component } from "react";

import { connect } from "react-redux";
// import "./HomeFooter.scss";
import Slider from "react-slick";
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p className="">
          &copy; 2023 Minh Hậu IT with hoi dan IT. More information, please
          visit my github.
          <a
            target="_blank"
            href="https://github.com/nguyenminhhau123/fullStackMinhHau"
          >
            &#8594; CLICK HERE &#8592;
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
