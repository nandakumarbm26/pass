import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";

const CardProduk = (props) => {
  return (
    <Fragment>
      <div
        className={
          "wrapper__list-items overflow-hidden position-relative z-3 d-flex justify-content-center align-items-center " +
          (props.id % 2 == 0 ? "mt-4 mt-sm-5" : "mt-4 mt-sm-0")
        }
      >
        <img src="./../images/Mask Group (2).png" className="bg" alt="" />
        <img src={props.produk} className="item position-relative z-1" alt="" />
        <div className="desc bg__white d-flex justify-content-between z-2">
          <div className="lh-1">
            <h5 className="font__size--20 text__20-1024 bold color__black mb-0 text-capitalize">
              {props.title}
            </h5>
            <p className="mb-0 font__size--12 text__12-1024 color__gray-1">
              {props.number} Item
            </p>
          </div>
          <a
            href="#!"
            className="d-flex justify-content-center align-items-center popup"
          >
            <img src="./../images/Frame (1as).png" alt="" />
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default CardProduk;
