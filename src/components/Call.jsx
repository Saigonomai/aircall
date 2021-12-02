import React from "react";
import { useDispatch } from "react-redux";
import { contentActions } from "../store/content.jsx";

import "./Call.module.css";

const Call = (props) => {
  const dispatch = useDispatch();
  const date = new Date(props.call.created_at);

  let to;
  let from;
  props.call.to ? (to = props.call.to) : (to = "Unknown");
  props.call.from ? (from = props.call.from) : (from = "Unknown");

  const detailHandler = () => {
    dispatch(contentActions.setDetails(props.call));
  };

  let content;

  if (props.call.direction == "inbound") {
    content = (
      <div className="call-section">
        <div className="date">{date.toDateString()}</div>
        <hr className="hr" />
        <div className="call-box" onClick={detailHandler}>
          <div>
            <div className="call-number">{from}</div>
            <div className="call-desc">Received call on {to}</div>
          </div>
          <div>
            <div className="call-time">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.call.direction == "outbound") {
    content = (
      <div className="call-section">
        <div className="date">{date.toDateString()}</div>
        <hr className="hr" />
        <div className="call-box" onClick={detailHandler}>
          <div>
            <div className="call-number">{to}</div>
            <div className="call-desc">Tried to call on {from}</div>
          </div>
          <div>
            <div className="call-time">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default Call;
