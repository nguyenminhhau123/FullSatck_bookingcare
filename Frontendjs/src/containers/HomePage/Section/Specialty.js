import React, { Component } from "react";

import { connect } from "react-redux";
import "./Specialty.scss";
import logo from "../../../assets/bookingcare-2020.svg";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files

class Specialty extends Component {
  render() {
    return (
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-selection">Chuyên khoa phổ biến</span>
            <button className="btn-selection"> Xem thêm </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="title-image"> Cơ xương khớp 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
