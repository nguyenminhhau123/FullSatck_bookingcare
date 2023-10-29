import React, { Component } from "react";

import { connect } from "react-redux";
// import "./About.scss";
import Slider from "react-slick";
class About extends Component {
  render() {
    return (
      <div className=" section-share section-about ">
        <div className="section-header-footer">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="section-about-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/Sq_Qt8PWf_Y?list=PLeS7aZkL6GOvCz3GiOtvtDXChJRuebb7S"
              title="Redux tutorial: 01 - Giới thiệu tổng quan về Redux 🎉 (2020)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="section-about-right">
            Redux là một thư viện quản lý trạng thái (state management library)
            cho ứng dụng JavaScript. Nó được sử dụng phổ biến trong các ứng dụng
            React, nhưng cũng có thể được sử dụng độc lập với bất kỳ framework
            JavaScript nào khác hoặc thậm chí cả trong ứng dụng không phải
            JavaScript.
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
