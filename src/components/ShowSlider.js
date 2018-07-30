import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class ShowSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      width: sessionStorage.getItem("sizeWidth"),
      keyStorage: sessionStorage.getItem("keyStorage")
    };
  }

  /* <----------------- Get Data from LocalStorage -----------------> */
  componentWillMount() {
    if (localStorage !== null && localStorage.getItem(this.state.keyStorage)) {
      var data = JSON.parse(localStorage.getItem(this.state.keyStorage));
      this.setState({
        data: data
      });
    } else {
      console.log("No Data Storage !");
    }
  }
  /* <--------------------------------------------------------------> */

  render() {
    /* --------------------Config Settings for Slider -------------------- */
    const settings = {
      infinite: false,
      speed: 700,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: false,
            speed: 700,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            speed: 700,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    /*  ------------------------------------------------------------------ */

    /* --------------------------Generate Slider ------------------------ */

    const element = this.state.data.map((item, key) => {
      return (
        <div key={key} className="card-image">
          <a href={item.url} alt={item.title} target="_blank">
            <img src={item.image} alt={item.title} />
            <h5> {item.title} </h5>
          </a>
        </div>
      );
    });
    /* -------------------------------------------------------------------- */
    return (
      <div className="slider-wrapper">
        <p>
          {" "}
          &raquo; Bài viết tham khảo
          <span>
            <button
              className="buttonFix"
              onClick={() => document.getElementById("slider-content").remove()}
            >
              {" "}
              x{" "}
            </button>
          </span>
        </p>
        <div style={{ width: this.state.width + "px" }}>
          <Slider className="slider-2" {...settings}>
            {element}
          </Slider>
        </div>
      </div>
    );
  }
}
/* <------------------------- Render Slider if exist data-----------------> */
if (
  sessionStorage.getItem("url") !== null &&
  sessionStorage.getItem("keyStorage") &&
  localStorage.getItem(sessionStorage.getItem("keyStorage"))
) {
  ReactDOM.render(<ShowSlider />, document.getElementById("slider-content"));
}

export default ShowSlider;
