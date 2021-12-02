import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

import Header from "./Header.jsx";
import store from "./store/index.jsx";
import TabHeader from "./components/TabHeader.jsx";
import CallList from "./components/CallList.jsx";
import Details from "./components/Details.jsx";

const App = () => {
  const [calls, setCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [inboxCalls, setInboxCalls] = useState([]);

  const contentState = useSelector((state) => state.content.content);
  const callDetails = useSelector((state) => state.content.callDetails);

  const fetchCallsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://aircall-job.herokuapp.com/activities"
      );

      const callList = await response.json();

      const archivedCalls = [];
      const inboxCalls = [];

      for (const call of callList) {
        if (call.is_archived) {
          archivedCalls.push(call);
        } else {
          inboxCalls.push(call);
        }
      }

      setCalls(callList);
      setArchivedCalls(archivedCalls);
      setInboxCalls(inboxCalls);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  });

  useEffect(() => {
    fetchCallsHandler();
  }, [contentState]);

  let content;

  if (contentState == "inbox") {
    content = (
      <React.Fragment>
        <TabHeader />
        {(inboxCalls.length > 0) && <CallList calls={inboxCalls} />}
        {!(inboxCalls.length > 0) && <div className='empty-content'>No Recent Calls</div>}
      </React.Fragment>
    );
  } else if (contentState == "archived") {
      content = (
        <React.Fragment>
          <TabHeader />
          {(archivedCalls.length > 0) && <CallList calls={archivedCalls} />}
          {!(archivedCalls.length > 0) && <div className='empty-content'>No Archived Calls</div>}
        </React.Fragment>
      );
  } else if (contentState == "details") {
    content = (
      <React.Fragment>
        <TabHeader />
        <Details call={callDetails} />
      </React.Fragment>
    );
  }

  return (
    <div className="container">
      <Header />
      {content}
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

export default App;
