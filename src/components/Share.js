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
  render() {
    return (
      <div className="my-5">
        <div className="bc-tiles-intro-text">
          <h2>Share now</h2>
          <div className="bc-tiles-intro-details">
            <p>
              Share the timeline. Spread the word. Help your friends put some
              structure to the fertility mystery
            </p>

            {/* <!-- <p><strong>Pick what’s important to you to find your best birth control method:</strong></p> -->  */}
          </div>
        </div>

        <div
          className="d-flex justify-content-center mb-5"
          data-href="http://www.proactiveforher.com/tools/fertility-timeline/"
          data-layout="button_count"
        >
          <a
            className="mx-3"
            href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.proactiveforher.com%2Ftools%2Ffertility-timeline%2F"
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
            href="https://twitter.com/share/?text=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
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
            href="mailto:?subject=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive&amp;body=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
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
            href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F&amp;title=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.&amp;summary=Proactive's%20free%20Fertility%20Timeline%20tool%20helps%20you%20visualize%20your%20conception%20timeline.%20Just%20input%20your%20age,%20when%20you%20wish%20to%20start%20and%20how%20many%20kids%20you%20want%20to%20have,%20and%20see%20how%20your%20profile%20looks%20like.&amp;source=http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
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
            href="https://api.whatsapp.com/send?text=Structure%20your%20fertility%20profile.%20Follow%20your%20timeline%20at%20your%20own%20terms.%20|%20Proactive%20http%3A%2F%2Fproactiveforher.com%2Ftools%2Ffertility-timeline%2F"
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
          <h2>Comment</h2>
          <div className="bc-tiles-intro-details">
            <p>Share anything you would like to say</p>

            {/* <!-- <p><strong>Pick what’s important to you to find your best birth control method:</strong></p> -->  */}
          </div>
        </div>
        <div
          className="fb-comments d-flex justify-content-center"
          data-href="http://www.proactiveforher.com/tools/fertility-timeline/"
          data-numposts="5"
          data-width=""
        ></div>
      </div>
    );
  }
}
