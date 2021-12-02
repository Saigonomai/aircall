import React from "react";
import { useDispatch } from "react-redux";
import { contentActions } from "../store/content.jsx";

import './details.module.css'

const Details = (props) => {
  const dispatch = useDispatch(); 
  let content;
  let archiveButton;
  
  async function updateArchiveHandler() {
    const response = await fetch(
      'https://aircall-job.herokuapp.com/activities/'+props.call.id,
      {
        method: "POST",
        body: JSON.stringify({is_archived: true}),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    dispatch(contentActions.setInbox());
  }

  async function updateUnarchiveHandler() {
    const response = await fetch(
      'https://aircall-job.herokuapp.com/activities/'+props.call.id,
      {
        method: "POST",
        body: JSON.stringify({is_archived: false}),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    dispatch(contentActions.setArchived());
  }

  const homepageHandler = () => {
    dispatch(contentActions.setInbox());
  }

  if (props.call.is_archived) {
    archiveButton = (
      <button className='archive-button' onClick={updateUnarchiveHandler}>Unarchive this Call</button>
    )
  } else {
    archiveButton = (
      <button className='archive-button' onClick={updateArchiveHandler}>Archive this Call</button>
    )
  } 
  
  const date = new Date(props.call.created_at);
  
  if (props.call.direction == "inbound") {
    content = (
      <div className='details-section'>
        <div className='details-header'>From: {props.call.from}</div>
        <div className='details-date'>{date.toDateString()} {date.toLocaleTimeString()}</div>
        <div className='details'>Call made to {props.call.to}</div>
        <div className='details'>Call made via: {props.call.via}</div>
        <div className='details'>Call Duration: {props.call.duration} seconds</div>
        <div className='details'>Call Status: {props.call.call_type}</div>
        {archiveButton}
        <button className='return-button' onClick={homepageHandler}>Return</button>
      </div>
    );
  } else if (props.call.direction == "outbound") {
    content = (
      <div className='details-section'>
        <div className='details-header'>To: {props.call.to}</div>
        <div className='details-date'>{date.toDateString()}, {date.toLocaleTimeString()}</div>
        <div className='details'>Call made as {props.call.from}</div>
        <div className='details'>Call made via: {props.call.via}</div>
        <div className='details'>Call Duration: {props.call.duration}</div>
        <div className='details'>Call Status: {props.call.call_type}</div>
        {archiveButton}
        <button className='return-button' onClick={homepageHandler}>Return</button>
      </div>
    );
  }

  return (
    <div>
      {content};
    </div>
  );
}

export default Details;