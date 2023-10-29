import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";
class HandBook extends Component {
  render() {
    return (
      <div className=" section-share  ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-selection">Cẩm nang</span>
            <button className="btn-selection"> Tất cả bài viết </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize ">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="section-customize-title">
                  Bảo trì khớp gối – 3 lợi ích giữ cho bước chân không bị giới
                  hạn
                </div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="section-customize-title">
                  Bảo trì khớp gối – 3 lợi ích giữ cho bước chân không bị giới
                  hạn
                </div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="section-customize-title">
                  Bảo trì khớp gối – 3 lợi ích giữ cho bước chân không bị giới
                  hạn
                </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
