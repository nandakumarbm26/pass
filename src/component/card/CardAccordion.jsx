import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";

const CardAccordion = (props) => {
  return (
    <Fragment>
      <div className="wrapper__accordion mb-4">
        <div
          className={
            "head d-flex justify-content-between align-items-center pointer " +
            (props.accordionSelect == props.id + 1 ? "active" : "")
          }
          onClick={(id) => props.clickAccordion(props.id + 1)}
        >
          <h3 className="bold font__size--14 text__14-1024 color__black m-0">
            {props.title}
          </h3>
          <div className="icon-close position-relative flex-shrink-0 ml-2"></div>
        </div>
        <div className="desc">
          <p className="lh-2 normal font__size--14 text__14-1024 color__gray-1 m-0">
            {props.desc}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default CardAccordion;
