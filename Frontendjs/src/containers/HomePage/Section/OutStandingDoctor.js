import React, { Component } from "react";
import { LANGUAGES } from "../../../utils";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],
    };
  }
  componentDidMount() {
    this.props.getUserDoctorStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataDoctorRedux !== this.props.dataDoctorRedux) {
      let arrDoctor = this.props.dataDoctorRedux;
      this.setState({
        dataDoctor: arrDoctor,
      });
    }
  }
  render() {
    let arrDoctor = this.state.dataDoctor;
    let language = this.props.language;
    console.log("check data doctor state", arrDoctor);
    return (
      <div className=" section-share section-specialty ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-selection">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-selection">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctor.data &&
                arrDoctor.data.length > 0 &&
                arrDoctor.data.map((items, index) => {
                  let imageBase64 = "";
                  if (items.image) {
                    imageBase64 = new Buffer(items.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${items.positionData.valueVi},${items.lastName} ${items.firstName}`;
                  let nameEn = `${items.positionData.valueEn},${items.firstName} ${items.lastName} `;
                  return (
                    <div className="section-customize">
                      <div className="section-border">
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-outStandingDoctor
                            "
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            />
                          </div>

                          <div className="title-image">
                            {language === LANGUAGES.EN ? nameEn : nameVi}
                          </div>
                          <div className="">Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <div className="section-customize">
                <div className="section-border">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outStandingDoctor" />
                    </div>

                    <div className="title-image">
                      Phó Giáo sư, Tiến sĩ Minh Hậu
                    </div>
                    <div className="">Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="section-border">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outStandingDoctor" />
                    </div>

                    <div className="title-image">
                      Phó Giáo sư, Tiến sĩ Minh Hậu
                    </div>
                    <div className="">Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="section-border">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outStandingDoctor" />
                    </div>

                    <div className="title-image">
                      Phó Giáo sư, Tiến sĩ Minh Hậu
                    </div>
                    <div className="">Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="section-border">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outStandingDoctor" />
                    </div>

                    <div className="title-image">
                      Phó Giáo sư, Tiến sĩ Minh Hậu
                    </div>
                    <div className="">Cơ xương khớp</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="section-border">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outStandingDoctor" />
                    </div>

                    <div className="title-image">
                      Phó Giáo sư, Tiến sĩ Minh Hậu
                    </div>
                    <div className="">Cơ xương khớp</div>
                  </div>
                </div>
              </div> */}
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
    dataDoctorRedux: state.admin.doctorData,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDoctorStart: () => dispatch(actions.getUserDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
