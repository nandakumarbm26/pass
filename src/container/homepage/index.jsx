import React, { Component, Fragment, createRef } from "react";
import { $ } from "react-jquery-plugin";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import bg from "./travel.png";

import { Link } from "react-router-dom";
import InstructionModal from "../../component/InstructionModal";
import { Button } from "@mui/material";
import PassportApp from "../passport/index";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      navbarScroll: false,
      navbar: false,
      accordionSelect: 0,
    };
    this.nextSLick = this.nextSLick.bind(this);
    this.previousSlick = this.previousSlick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Changing state
    this.setState({
      open: !this.state.open,
    });
  }
  componentDidMount() {
    AOS.init({
      once: true,
    });

    window.addEventListener("scroll", this.categoriesFixed, this);

    $("a[href^='#click-']").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top,
        },
        1000
      );
    });
  }

  categoriesFixed = () => {
    if (window.pageYOffset > 100) {
      this.setState({
        navbarScroll: true,
      });
    } else {
      this.setState({
        navbarScroll: false,
      });
    }
  };
  renderContent() {
    return (
      <InstructionModal
        height={"100vh"}
        width={"100vw"}
        openStatus={this.state.open}
        childern={<PassportApp />}
      ></InstructionModal>
    );
  }
  nextSLick() {
    this.sliderSlick.slickNext();
  }
  previousSlick() {
    this.sliderSlick.slickPrev();
  }

  navbarShowing = (n) => {
    this.setState({
      navbar: !this.state.navbar,
    });
  };

  clickAccordion = (id) => {
    if (id != this.state.accordionSelect) {
      this.setState({
        accordionSelect: id,
      });
    } else {
      this.setState({
        accordionSelect: 0,
      });
    }
  };

  render() {
    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Fragment>
        <div className="overflow-hidden">
          <div className="bg__black">
            <nav
              class={
                "navbar navbar-expand-lg wrapper__navbar fixed position-relative z-2 " +
                (this.state.navbarScroll ? "active" : "")
              }
            >
              <div className="container">
                <Link
                  class="navbar-brand d-flex align-items-center z-3"
                  to="/passport"
                >
                  <img src="./../images/Frame (1).png" alt="" />
                  <span className="bold font__size--22 text__22-1024 color__white ml-2 nunito">
                    PassPort
                  </span>
                </Link>

                <div
                  class="navbar__toogle d-flex d-lg-none"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div
                  class="collapse navbar-collapse navbar__menu centered"
                  id="navbarSupportedContent"
                >
                  {/* <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a
                        class="nav-link bold font__size--12 text__12-1024 color__white"
                        href="#click-collection"
                      >
                        COLLECTIONS
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link bold font__size--12 text__12-1024 color__white"
                        href="#click-studio"
                      >
                        STUDIO
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link bold font__size--12 text__12-1024 color__white"
                        href="#click-testimonial"
                      >
                        TESTIMONIAL
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link bold font__size--12 text__12-1024 color__white"
                        href="#click-faq"
                      >
                        FAQ
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#click-contact"
                        className="btn__contact bold font__size--14 text__14-1024 color__white d-inline-block mx-auto d-lg-none"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li class="nav-item d-block d-lg-none">
                      <hr className="hr__menu" />
                      <div className="wrapper__sosmed-list d-flex justify-content-center align-items-center">
                        <a href="#!">
                          <img src="./../images/Frame (3).png" alt="" />
                        </a>
                        <a href="#!">
                          <img src="./../images/Frame (4).png" alt="" />
                        </a>
                        <a href="#!">
                          <img src="./../images/Frame (5).png" alt="" />
                        </a>
                        <a href="#!">
                          <img src="./../images/Frame (6).png" alt="" />
                        </a>
                      </div>
                    </li>
                  </ul> */}
                </div>
                <a
                  href="#click-contact"
                  className="btn__contact ml-auto bold font__size--14 text__14-1024 color__white d-none d-lg-block"
                >
                  Contact Us
                </a>
              </div>
            </nav>
            <section className="section__head position-relative pt-4 overflow-hidden">
              <img
                src="./../images/Group 2672.png"
                className="path__5"
                alt=""
              />
              <div className="container position-relative">
                <div className="wrapper__character d-none d-lg-block">
                  <div className="position-relative">
                    <img src={bg} style={{ width: "65vw" }} alt="" />
                  </div>
                </div>
                <div className="row mt__4">
                  <div className="col-lg-9 col-xl-7 position-relative text-center text-lg-left z-3">
                    <h2 className="bold font__size--45 text__60-1024 text__60-sm color__white mb-0">
                      Online eDigital photo
                      <br className="d-none d-lg-block" /> in less than one
                      minute{" "}
                      {/* <span className="position-relative wrapper__round-text ">
                        <img
                          src="./../images/Highlight_07.png"
                          className="round"
                          alt=""
                        />
                        with us{" "}
                      </span> */}
                    </h2>

                    <p className="medium lh-2 font__size--18 text__18-1024 text__18-xs color__white mt-4 mb-4">
                      The Online service caters to creating digital
                      <br className="d-none d-lg-block" />
                      ePhoto world for passport and visa
                    </p>
                    <div className="wrapper__box-price wrap__flex-sm-50 text-center text-md-left d-flex justify-content-between align-items-center">
                      <div className="list grid mb-4 mb-md-0">
                        <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
                          Country
                        </h5>
                        <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
                          <select id="Country" name="Country">
                            <option value="US">United States of America</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </h4>
                      </div>
                      <div className="list grid mb-4 mb-md-0">
                        <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
                          Requirement
                        </h5>
                        <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
                          <select id="Country" name="Country">
                            <option value="passport">Passport</option>
                            <option value="visa">Visa</option>
                            <option value="passvisa">Passport + Visa</option>
                          </select>
                        </h4>
                      </div>

                      <div className="list grid">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={this.handleClick}
                        >
                          Lets Start
                        </Button>
                        {this.state.open && (
                          <InstructionModal
                            height={"100vh"}
                            width={"100vw"}
                            openStatus={true}
                            childern={<PassportApp />}
                          ></InstructionModal>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section>
            <div className="container">
              <div className="wrapper__chooce bg__white w-100">
                <div className="text-center">
                  <h1 className="extra-bold font__size--55 text__50-1024 text__50-sm mb-4">
                    Why <span className="color__purple">choose us?</span>
                  </h1>
                  <p className="lh-2 semi-bold font__size--14 text__14-1024 color__black opacity__5">
                    We have various advantages and conveniences that we offer
                    you as the best musical <br className="d-none d-md-block" />{" "}
                    instrument rental place and we make sure you are happy for
                    it
                  </p>

                  <div className="row justify-content-center mt-5">
                    <div className="col-xl-10">
                      <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                          <div className="wrapper__list-choose flex-fill h-100 text-center">
                            <img src="./../images/Group 3407.png" alt="" />
                            <h5 className="bold font__size--18 text__18-1024 text__18-xs color__black">
                              Book and cancel anytime
                            </h5>
                            <p className="medium font__size--14 text__14-1024 color__gray-1 lh-2 m-0">
                              When you rent a musical instrument in our shop,
                              you can decide when you want to rent it and cancel
                              it at any time
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                          <div className="wrapper__list-choose flex-fill h-100 text-center">
                            <img src="./../images/Group 3408.png" alt="" />
                            <h5 className="bold font__size--18 text__18-1024 text__18-xs color__black">
                              Very low rental rates
                            </h5>
                            <p className="medium font__size--14 text__14-1024 color__gray-1 lh-2 m-0">
                              We have a variety of rental items with good
                              quality but believe me, even so it will not drain
                              your pocket
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                          <div className="wrapper__list-choose flex-fill h-100 text-center">
                            <img src="./../images/Group 3409.png" alt="" />
                            <h5 className="bold font__size--18 text__18-1024 text__18-xs color__black">
                              Free shipping anywhere
                            </h5>
                            <p className="medium font__size--14 text__14-1024 color__gray-1 lh-2 m-0">
                              If you have made a rental but you can't pick up
                              your item at our shop, don't worry, we will
                              deliver it to you
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}
