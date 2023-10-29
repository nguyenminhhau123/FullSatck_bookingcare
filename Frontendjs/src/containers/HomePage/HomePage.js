import React, { Component } from "react";

import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader.js";
import Specialty from "./Section/Specialty.js";
import MedicalFacility from "./Section/MedicalFacility.js";
import OutStandingDoctor from "./Section/OutStandingDoctor.js";
import HandBook from "./Section/HandBook.js";
import About from "./Section/About.js";
import HomeFooter from "./Section/HomeFooter.js";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="">
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
