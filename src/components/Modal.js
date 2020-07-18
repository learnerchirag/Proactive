import React, { Component } from "react";
import { Button } from "reactstrap";
import Popup from "reactjs-popup";

export default class Modal extends Component {
  state = {
    open: true,
  };
  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          closeOnDocumentClick={false}
          modal
          onClose={() =>
            this.setState({
              open: false,
            })
          }
          contentStyle={{ border: "2px solid black", borderRadius: "15px" }}
        >
          <div className="py-2 px-md-5 text-center">
            <div
              className="sub-header-all text-center mb-3"
              style={{
                fontSize: "18px",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>Medical Disclaimer</h3> The
              information on this site is not intended or implied to be a
              substitute for professional medical advice, diagnosis or
              treatment. All content, including text, graphics, images and
              information, contained on or available through this web site is
              for general information purposes only. You are encouraged to
              confirm any information obtained from or through this web site
              with a physician. Never disregard professional medical advice or
              delay seeking medical treatment because of something you have read
              on or accessed through this web site.
            </div>
            <Button
              onClick={() => {
                this.setState({ open: false });
              }}
              style={{ backgroundColor: "#163948", color: "white" }}
              className="modal-btn"
            >
              I Understand
            </Button>
          </div>
        </Popup>
      </div>
    );
  }
}
