import { configureStore } from "@reduxjs/toolkit";

import contentReducer from './content.jsx';

const store = configureStore({reducer:{content: contentReducer}});

export default store;