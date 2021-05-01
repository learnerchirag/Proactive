import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  fab,
  faFacebook,
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default class Share extends Component {
  componentDidMount = () => {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
  render() {
    return (
      <div className="my-5">
        <div className="bc-tiles-intro-text">
          <h2 className="header-all">Share now</h2>
          <div className="bc-tiles-intro-details">
            <p>
              Structure your fertility profile. Follow your timeline at your own
              terms.
            </p>

            {/* <!-- <p><strong>Pick what’s important to you to find your best birth control method:</strong></p> -->  */}
          </div>
        </div>

        <div
          className="d-flex justify-content-center mb-5"
          // data-href="http://www.proactiveforher.com/tools/irregular-periods/"
          data-layout="button_count"
        >
          <a
            className="mx-3"
            href={this.props.fbH}
            target="_blank"
            rel="noopener"
            aria-label=""
            style={{
              backgroundColor: "#475993",
              borderRadius: "5px",
              width: "50px",
              height: "50px",
              lineHeight: "55px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          </a>

          <a
            className="mx-3"
            href={this.props.twH}
            target="_blank"
            rel="noopener"
            aria-label=""
            style={{
              backgroundColor: "#76a9ea",
              borderRadius: "5px",
              width: "50px",
              height: "50px",
              lineHeight: "55px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ fontSize: "30px", color: "white" }}
            />
          </a>

          <a
            className="mx-3"
            href={this.props.emH}
            target="_self"
            rel="noopener"
            aria-label=""
            style={{
              backgroundColor: "#fdbf04",
              borderRadius: "5px",
              width: "50px",
              height: "50px",
              lineHeight: "55px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ fontSize: "30px", color: "white" }}
            />
          </a>

          <a
            className="mx-3"
            href={this.props.liH}
            target="_blank"
            rel="noopener"
            aria-label=""
            style={{
              backgroundColor: "#0077b7",
              borderRadius: "5px",
              width: "50px",
              height: "50px",
              lineHeight: "55px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              style={{ fontSize: "30px", color: "white" }}
            />
          </a>

          <a
            className="mx-3"
            href={this.props.whH}
            target="_blank"
            rel="noopener"
            aria-label=""
            style={{
              backgroundColor: "#7ad06d",
              borderRadius: "5px",
              width: "50px",
              height: "50px",
              lineHeight: "55px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              style={{ fontSize: "30px", color: "white" }}
            />
          </a>
        </div>
        <div className="bc-tiles-intro-text my-5">
          <h2 className="header-all">Comment</h2>
          <div className="bc-tiles-intro-details">
            <p>Share anything you would like to say</p>

            {/* <!-- <p><strong>Pick what’s important to you to find your best birth control method:</strong></p> -->  */}
          </div>
        </div>
        <div
          class="fb-comments d-flex justify-content-center"
          data-href="http://www.proactiveforher.com/tools/fertility-timeline/"
          data-numposts="5"
          data-width=""
        ></div>
      </div>
    );
  }
}
