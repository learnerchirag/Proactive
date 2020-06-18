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
      <div className="mt-5">
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

        <div className="d-flex justify-content-center">
          <a
            className="pl-4"
            href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
            target="_blank"
            rel="noopener"
            aria-label=""
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{ fontSize: "50px", color: "#475993" }}
            />
          </a>

          <a
            className="pl-4"
            href="https://twitter.com/intent/tweet/?text=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
            target="_blank"
            rel="noopener"
            aria-label=""
          >
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ fontSize: "50px", color: "#76a9ea" }}
            />
          </a>

          <a
            className="pl-4"
            href="mailto:?subject=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;body=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
            target="_self"
            rel="noopener"
            aria-label=""
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ fontSize: "50px", color: "#fdbf04" }}
            />
          </a>

          <a
            className="pl-4"
            href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F&amp;title=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;summary=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!&amp;source=http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
            target="_blank"
            rel="noopener"
            aria-label=""
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              style={{ fontSize: "50px", color: "#0077b7" }}
            />
          </a>

          <a
            className="pl-4"
            href="whatsapp://send?text=Share%20the%20tool.%20Spread%20the%20word.%20Help%20your%20friends%20put%20some%20structure%20to%20the%20birth%20control%20mystery!%20http%3A%2F%2Fproactiveforher.com%2Ftools%2Fbirth-control%2F"
            target="_blank"
            rel="noopener"
            aria-label=""
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              style={{ fontSize: "50px", color: "7ad06d" }}
            />
          </a>
        </div>
      </div>
    );
  }
}
