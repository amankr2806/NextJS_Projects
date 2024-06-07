//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const initialVal = {
    count: 0,
}

const counterReducer = (store = initialVal, action) => {
    if(action.type === "Increment"){
        return {count: store.count + 1}
    }else if(action.type === "Decrement"){
        return {count: store.count - 1}
    }else if(action.type === 'Reset'){
        return {count: 0}
    }
    return store;
}

const counterStore = configureStore({reducer: {
    
}});

export default counterStore;