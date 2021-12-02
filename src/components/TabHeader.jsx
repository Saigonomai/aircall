import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contentActions } from "../store/content.jsx";

import './TabHeader.module.css'

const TabHeader = () => {
  const [activeButton, setActiveButton] = useState('inbox')
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.content.content);

  const setInbox = () => {
    dispatch(contentActions.setInbox());
    setActiveButton('inbox');
  }
  
  const setArchived = () => {
    dispatch(contentActions.setArchived());
    setActiveButton('archived');
  }

  return (
    <div className='tab'>
      <button className={`tablinks ${(activeButton == 'inbox') && 'active'}`} onClick={setInbox} >Activity Feed</button>
      <button className={`tablinks ${(activeButton == 'archived') && 'active'}`} onClick={setArchived}>Archived</button>
    </div>
  )
}

export default TabHeader;