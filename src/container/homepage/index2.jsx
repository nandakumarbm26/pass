import React, { Fragment, useRef, useEffect, useState } from "react";
import { $ } from "react-jquery-plugin";
import AOS from "aos";
import "aos/dist/aos.css";
import bg from "./travel.png";
import { setRequiremnets, getCountryParams } from "../../redux/country/action";
import { Link } from "react-router-dom";
import InstructionModal from "../../component/InstructionModal";
import { Button } from "@mui/material";
import PassportApp from "../passport/index";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
export default function Index2(props) {
  const state = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [navbarScroll, setNavbarScroll] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const countryRef = useRef();
  const requirementRef = useRef();
  const handleClick = () => {
    // Changing state
    setOpen(!open);
    console.log(state);
  };

  const countryUpdate = () => {
    dispatch(getCountryParams(countryRef.current.value));
  };

  const updateRequirments = () => {
    dispatch(setRequiremnets(requirementRef.current.value));
    console.log(requirementRef.current.value);
  };

  useEffect(() => {
    AOS.init({
      once: true,
    });

    window.addEventListener("scroll", categoriesFixed, this);

    $("a[href^='#click-']").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top,
        },
        1000
      );
    });
  }, []);

  const categoriesFixed = () => {
    if (window.pageYOffset > 100) {
      setNavbarScroll(true);
    } else {
      setNavbarScroll(false);
    }
  };
  const renderContent = () => {
    return (
      <InstructionModal
        height={"100vh"}
        width={"100vw"}
        openStatus={open}
        childern={<PassportApp />}
      ></InstructionModal>
    );
  };

  const navbarShowing = (n) => {
    setNavbar(!navbar);
  };

  //   const clickAccordion = (id) => {
  //     if (id != accordionSelect) {
  //       setState({
  //         accordionSelect: id,
  //       });
  //     } else {
  //       setState({
  //         accordionSelect: 0,
  //       });
  //     }
  //   };

  return (
    <Fragment>
      <div className="overflow-hidden">
        <div className="bg__black">
          <nav
            class={
              "navbar navbar-expand-lg wrapper__navbar fixed position-relative z-2 " +
              (navbarScroll ? "active" : "")
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
              ></div>
              <a
                href="#click-contact"
                className="btn__contact ml-auto bold font__size--14 text__14-1024 color__white d-none d-lg-block"
              >
                Contact Us
              </a>
            </div>
          </nav>
          <section className="section__head position-relative pt-4 overflow-hidden">
            <img src="./../images/Group 2672.png" className="path__5" alt="" />
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
                    <br className="d-none d-lg-block" /> in less than one minute{" "}
                  </h2>

                  <p className="medium lh-2 font__size--18 text__18-1024 text__18-xs color__white mt-4 mb-4">
                    The Online service caters to creating digital
                    <br className="d-none d-lg-block" />
                    ePhoto world for passport and visa
                  </p>
                  <Grid
                    container
                    rowGap={2}
                    className="wrapper__box-price wrap__flex-sm-50 text-center text-md-left d-flex justify-content-between align-items-center"
                  >
                    <Grid item sm={4} xs={12}>
                      <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
                        Country
                      </h5>
                      <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
                        <select
                          id="Country"
                          name="Country"
                          ref={countryRef}
                          onChange={countryUpdate}
                        >
                          <option value="US">United States of America</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </h4>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <h5 className="semi-bold font__size--14 text__14-1024 color__gray-1">
                        Requirement
                      </h5>
                      <h4 className="bold font__size--18 text__18-1024 text__18-xs mb-0">
                        <select
                          ref={requirementRef}
                          id="Country"
                          name="Country"
                          onChange={updateRequirments}
                        >
                          <option value="passport">Passport</option>
                          <option value="visa">Visa</option>
                          <option value="passport + visa">
                            Passport + Visa
                          </option>
                        </select>
                      </h4>
                    </Grid>
                    <Grid sm={4} xs={12} item>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleClick}
                      >
                        Lets Start
                      </Button>
                      {open && (
                        <InstructionModal
                          height={"100vh"}
                          width={"100vw"}
                          openStatus={true}
                          childern={<PassportApp />}
                        ></InstructionModal>
                      )}
                    </Grid>
                  </Grid>
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
                  We have various advantages and conveniences that we offer you
                  as the best Photo <br className="d-none d-md-block" /> for
                  Visa and Passport requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
